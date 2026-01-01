<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Routine extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'description',
        'level',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function exercises()
{
    return $this->hasMany(RoutineExercise::class)->orderBy('order');
}

public function show(Routine $routine)
{
    return $routine->load('exercises.exercise');
}


}

