<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class WorkoutExercise extends Model
{

     protected $fillable = ['workout_id', 'exercise_id', 'order'];
    public function exercise()
{
    return $this->belongsTo(Exercise::class);
}
public function sets()
    {
        return $this->hasMany(WorkoutSet::class);
    }
}
