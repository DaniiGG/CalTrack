<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Exercise extends Model
{
    protected $fillable = [
  'name',
  'description',
  'muscle_group',
  'secondary_muscles',
  'equipment',
  'difficulty',
  'image_url',
  'video_url'
];

public function progressions()
{
    return $this->hasMany(ExerciseProgression::class);
}

}
