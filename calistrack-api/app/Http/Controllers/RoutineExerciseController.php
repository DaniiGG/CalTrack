<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RoutineExercise;
use App\Models\Routine;

class RoutineExerciseController extends Controller
{
    public function store(Request $request, Routine $routine)
    {
        $data = $request->validate([
            'exercise_id' => 'required|exists:exercises,id',
            'sets' => 'required|integer',
            'reps' => 'required|integer',
            'rest_seconds' => 'required|integer',
            'tempo' => 'nullable',
            'order' => 'integer',
            'notes' => 'nullable',
        ]);

        return $routine->exercises()->create($data);
    }

    public function destroy(RoutineExercise $routineExercise)
    {
        $routineExercise->delete();
        return response()->noContent();
    }
}
