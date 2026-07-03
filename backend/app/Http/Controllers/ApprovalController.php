<?php

namespace App\Http\Controllers;

use App\Models\Request as ResourceRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ApprovalController extends Controller
{
    public function approve(Request $request, ResourceRequest $resourceRequest): JsonResponse
    {
        //admin only
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        //only approve pending requests
        if ($resourceRequest->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending requests can be approved'
            ], 422);
        }

        $resourceRequest->update([
            'status'      => 'approved',
            'reviewed_by' => $request->user()->id,
            'admin_notes' => $request->input('admin_notes'),
        ]);

        return response()->json($resourceRequest);
    }


    public function reject(Request $request, ResourceRequest $resourceRequest): JsonResponse
    {
        // admin only
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        // only reject pending requests
        if ($resourceRequest->status !== 'pending') {
            return response()->json([
                'message' => 'Only pending requests can be rejected'
            ], 422);
        }

        $resourceRequest->update([
            'status'      => 'rejected',
            'reviewed_by' => $request->user()->id,
            'admin_notes' => $request->input('admin_notes'),
        ]);

        return response()->json($resourceRequest);
    }


    public function complete(Request $request, ResourceRequest $resourceRequest): JsonResponse
    {
        //admin only
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        //only complete approved requests
        if ($resourceRequest->status !== 'approved') {
            return response()->json([
                'message' => 'Only approved requests can be completed'
            ], 422);
        }

        $resourceRequest->update(['status' => 'completed']);

        return response()->json($resourceRequest);
    }
}