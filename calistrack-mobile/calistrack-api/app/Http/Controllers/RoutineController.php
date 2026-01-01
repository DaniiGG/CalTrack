<?php

namespace App\Http\Controllers;

use App\Models\Routine;
use Illuminate\Http\Request;

class RoutineController extends Controller
{
    public function index(Request $request)
    {
        return $request->user()->routines;
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'description' => 'nullable',
            'level' => 'required',
        ]);

        $routine = $request->user()->routines()->create($data);

        return response()->json($routine, 201);
    }
    public function destroy(Routine $routine)
    {
        $this->authorizeRoutine($routine);

        $routine->delete();

        return response()->json(['message' => 'Rutina eliminada']);
    }

    private function authorizeRoutine(Routine $routine)
    {
        if ($routine->user_id !== auth()->id()) {
            abort(403);
        }
    }
public function show($id)
{
    return Routine::with('exercises.exercise')->findOrFail($id);
}

}
