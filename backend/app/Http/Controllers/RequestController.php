<?php

namespace App\Http\Controllers;

use App\Models\Request as ResourceRequest;
use App\Http\Requests\Request\StoreRequestRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class RequestController extends Controller
{
    // GET /api/requests — collaborator sees own, admin sees all
    public function index(Request $request): JsonResponse
    {
        $user = $request->user();

        if ($user->role === 'admin') {
            $requests = ResourceRequest::with(['user', 'resource'])->get();
        } else {
            $requests = ResourceRequest::with(['user', 'resource'])
                ->where('user_id', $user->id)
                ->get();
        }

        return response()->json($requests);
    }

    // POST /api/requests
    public function store(StoreRequestRequest $request): JsonResponse
    {
        //check for overlapping reservations on same resource
        $overlap = ResourceRequest::where('resource_id', $request->resource_id)
            ->whereIn('status', ['pending', 'approved'])
            ->where(function ($query) use ($request) {
                $query->whereBetween('start_date', [$request->start_date, $request->end_date])
                      ->orWhereBetween('end_date',   [$request->start_date, $request->end_date])
                      ->orWhere(function ($query) use ($request) {
                          $query->where('start_date', '<=', $request->start_date)
                                ->where('end_date',   '>=', $request->end_date);
                      });
            })->exists();

        if ($overlap) {
            return response()->json([
                'message' => 'Resource is not available for the selected dates'
            ], 422);
        }

        //check resource is active
        $resource = \App\Models\Resource::find($request->resource_id);
        if (!$resource->is_active) {
            return response()->json([
                'message' => 'Resource is not active'
            ], 422);
        }

        $resourceRequest = ResourceRequest::create([
            'user_id'      => $request->user()->id,
            'resource_id'  => $request->resource_id,
            'start_date'   => $request->start_date,
            'end_date'     => $request->end_date,
            'status'       => 'pending',
            'observations' => $request->observations,
        ]);

        return response()->json($resourceRequest->load('resource'), 201);
    }

    // GET /api/requests/{id}
    public function show(Request $request, ResourceRequest $resourceRequest): JsonResponse
    {
        $user = $request->user();

        // collaborator can only see their own
        if ($user->role !== 'admin' && $resourceRequest->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json($resourceRequest->load(['user', 'resource']));
    }

    // PATCH /api/requests/{id}/cancel
    public function cancel(Request $request, ResourceRequest $resourceRequest): JsonResponse
    {
        $user = $request->user();

        // admins can cancel any request
        // collaborators can only cancel their own
        if ($user->role !== 'admin' && $resourceRequest->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        //cannot cancel a completed request
        if ($resourceRequest->status === 'completed') {
            return response()->json([
                'message' => 'Completed requests cannot be cancelled'
            ], 422);
        }

        //only pending or approved can be cancelled
        if (!in_array($resourceRequest->status, ['pending', 'approved'])) {
            return response()->json([
                'message' => 'This request cannot be cancelled'
            ], 422);
        }

        $resourceRequest->update(['status' => 'cancelled']);

        return response()->json($resourceRequest);
    }
}