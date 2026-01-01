<?php

namespace App\Http\Controllers;
use App\Models\Workout;

use Illuminate\Http\Request;

class WorkoutController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'routine_id' => 'required|exists:routines,id',
        'duration_seconds' => 'required|integer',
        'exercises' => 'required|array',
    ]);

    $workout = Workout::create([
        'user_id' => $request->user()->id,
        'routine_id' => $request->routine_id,
        'duration_seconds' => $request->duration_seconds,
    ]);

    foreach ($request->exercises as $index => $ex) {

        $workoutExercise = $workout->exercises()->create([
            'exercise_id' => $ex['exercise_id'],
            'order' => $index,
        ]);

        foreach ($ex['sets'] as $set) {
            $workoutExercise->sets()->create([
                'set_number' => $set['set_number'],
                'reps' => $set['reps'],
                'weight' => $set['weight'] ?? null,
                'rest_seconds' => $set['rest_seconds'] ?? null,
                'completed' => $set['completed'] ?? true,
            ]);
        }
    }

    return response()->json(
        $workout->load('exercises.exercise', 'exercises.sets'),
        201
    );
}

public function index(Request $request)
{
    return Workout::where('user_id', $request->user()->id)
        ->with(['routine', 'exercises.exercise'])
        ->orderBy('created_at', 'desc')
        ->get();
}

}
