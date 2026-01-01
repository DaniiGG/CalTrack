<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class WorkoutSet extends Model
{
    protected $fillable = [
        'workout_exercise_id',
        'set_number',
        'reps',
        'weight',
        'rest_seconds',
        'completed'
    ];
}
