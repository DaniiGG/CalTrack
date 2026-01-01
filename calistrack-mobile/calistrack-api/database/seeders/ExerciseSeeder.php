<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Exercise;

class ExerciseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        Exercise::insert([
            [
                'name' => 'Flexiones',
                'description' => 'Ejercicio básico de empuje',
                'muscle_group' => 'Pecho',
                'secondary_muscles' => 'Tríceps,Hombros',
                'equipment' => 'None',
                'difficulty' => 'beginner',
                'image_url' => 'https://...',
                'video_url' => 'https://youtube.com/...'
            ],
            [
                'name' => 'Dominadas',
                'description' => 'Ejercicio de tracción vertical',
                'muscle_group' => 'Espalda',
                'secondary_muscles' => 'Bíceps',
                'equipment' => 'Barra',
                'difficulty' => 'intermediate',
                'image_url' => null,
                'video_url' => null,
            ],
        ]);
    }
}
