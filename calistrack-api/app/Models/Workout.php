<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Workout extends Model
{
    protected $fillable = ['user_id', 'routine_id', 'duration_seconds'];

    public function exercises()
{
    return $this->hasMany(WorkoutExercise::class);
}

public function routine()
{
    return $this->belongsTo(Routine::class);
}

}
