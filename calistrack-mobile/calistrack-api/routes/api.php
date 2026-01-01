<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\RoutineController;
use App\Http\Controllers\ExerciseController;
use App\Http\Controllers\RoutineExerciseController;
use App\Http\Controllers\WorkoutController;
use App\Http\Controllers\ExerciseProgressionController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', fn (Request $request) => $request->user());
  
    Route::apiResource('routines', RoutineController::class);
 // Catálogo ejercicios
    Route::get('/exercises', [ExerciseController::class, 'index']);
    Route::post('/exercises', [ExerciseController::class, 'store']);

    // Ejercicios dentro de rutina
    Route::post('/routines/{routine}/exercises', [RoutineExerciseController::class, 'store']);
    Route::delete('/routine-exercises/{routineExercise}', [RoutineExerciseController::class, 'destroy']);
Route::post('/workouts', [WorkoutController::class, 'store']);
Route::get('/workouts', [WorkoutController::class, 'index']);

});

Route::middleware('auth:sanctum')->post('/logout', function (Request $request) {
    $request->user()->currentAccessToken()->delete();
    return response()->noContent();
});