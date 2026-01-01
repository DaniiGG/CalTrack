<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RoutineExercise extends Model
{
    protected $fillable = [
  'routine_id',
  'exercise_id',
  'sets',
  'reps',
  'rest_seconds',
  'tempo',
  'order',
  'notes'
];

public function exercise()
{
    return $this->belongsTo(Exercise::class);
}
}
