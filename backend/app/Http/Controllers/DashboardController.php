<?php

namespace App\Http\Controllers;

use App\Models\Request as ResourceRequest;
use App\Models\Resource;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        return response()->json([
            'total_resources'  => Resource::count(),
            'active_resources' => Resource::where('is_active', true)->count(),
            'total_requests'   => ResourceRequest::count(),
            'pending'          => ResourceRequest::where('status', 'pending')->count(),
            'approved'         => ResourceRequest::where('status', 'approved')->count(),
            'rejected'         => ResourceRequest::where('status', 'rejected')->count(),
            'completed'        => ResourceRequest::where('status', 'completed')->count(),
            'cancelled'        => ResourceRequest::where('status', 'cancelled')->count(),
        ]);
    }
}