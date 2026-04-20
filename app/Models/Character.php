<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Character extends Model
{
    protected $fillable = [
        'user_id',
        'name',
        'job_class',
        'level',
        'experience',
        'str',
        'int',
        'vit',
    ];

    /**
     * Get the user that owns the character.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the maximum experience for the current level.
     */
    public function getMaxExperienceAttribute(): int
    {
        return 100 * (2 ** ($this->level - 1));
    }
}
