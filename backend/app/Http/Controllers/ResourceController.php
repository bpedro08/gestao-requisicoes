<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resource;
use App\Http\Requests\Resource\StoreResourceRequest;
use App\Http\Requests\Resource\UpdateResourceRequest;
use Illuminate\Http\JsonResponse;

class ResourceController extends Controller
{    
    // GET /api/resources — all active resources (collaborator)
    public function index(): JsonResponse
    {
        $resources = Resource::where('is_active', true)->get();

        return response()->json($resources);
    }

    // GET /api/resources/all — all resources including inactive (admin only)
    public function all(Request $request): JsonResponse
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $query = Resource::query();

        // filtro por tipo
        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        // filtro por estado
        if ($request->has('is_active') && $request->is_active !== 'all') {
            $query->where('is_active', $request->is_active === 'true');
        }

        return response()->json($query->get());
    }

    // POST /api/resources
    public function store(StoreResourceRequest $request): JsonResponse
    {
        $resource = Resource::create($request->validated());

        return response()->json($resource, 201);
    }

    // PUT /api/resources/{id}
    public function update(UpdateResourceRequest $request, Resource $resource): JsonResponse
    {
        $resource->update($request->validated());

        return response()->json($resource);
    }

    // DELETE /api/resources/{id}
    public function destroy(Request $request, Resource $resource): JsonResponse
    {
        if ($request->user()->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $resource->delete();

        return response()->json(['message' => 'Resource deleted']);
    }

    public function show(Resource $resource): JsonResponse
{
    return response()->json($resource);
}

}
