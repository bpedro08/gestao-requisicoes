<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ResourceController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// Public routes — no token needed
Route::post('/login',  [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {

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
});
