<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;

class ExerciseController extends Controller
{
    public function index()
    {
        return Exercise::all();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'muscle_group' => 'required',
            'difficulty' => 'required',
            'description' => 'nullable',
            'secondary_muscles' => 'nullable',
            'equipment' => 'nullable',
            'image_url' => 'nullable',
            'video_url' => 'nullable',
        ]);

        return Exercise::create($data);
    }
}

