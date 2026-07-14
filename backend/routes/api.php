<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ResourceController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\ApprovalController;
use App\Http\Controllers\DashboardController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes — no token needed
Route::post('/login',  [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

    //Admin Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Auth routes
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me',      [AuthController::class, 'me']);

    // Resource routes
    Route::get('/resources',      [ResourceController::class, 'index']);
    Route::get('/resources/all',  [ResourceController::class, 'all']);
    Route::post('/resources',     [ResourceController::class, 'store']);
    Route::put('/resources/{resource}',    [ResourceController::class, 'update']);
    Route::get('/resources/{resource}',    [ResourceController::class, 'show']);
    Route::delete('/resources/{resource}', [ResourceController::class, 'destroy']);

        // Request routes
    Route::get('/requests',                        [RequestController::class, 'index']);
    Route::post('/requests',                       [RequestController::class, 'store']);
    Route::get('/requests/{resourceRequest}',      [RequestController::class, 'show']);
    Route::patch('/requests/{resourceRequest}/cancel', [RequestController::class, 'cancel']);

        // Approval routes
    Route::patch('/requests/{resourceRequest}/approve',  [ApprovalController::class, 'approve']);
    Route::patch('/requests/{resourceRequest}/reject',   [ApprovalController::class, 'reject']);
    Route::patch('/requests/{resourceRequest}/complete', [ApprovalController::class, 'complete']);
});
