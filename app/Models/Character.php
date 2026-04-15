<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo Character: Representa la entidad del personaje de cada usuario.
 * Contiene las estadísticas RPG (fuerza, inteligencia, vitalidad) y 
 * gestiona la progresión de niveles del sistema.
 */
class Character extends Model
{
    /**
     * Atributos que se pueden asignar masivamente.
     * Incluimos las estadísticas básicas (str, int, vit) y los datos de progresión.
     */
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
     * Relación Uno a Uno (inversa) con el Usuario.
     * Cada personaje pertenece obligatoriamente a un único usuario de la plataforma.
     * Esto nos permite acceder al dueño del personaje con $character->user.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Accessor: Atributo virtual 'max_experience'.
     * No existe en la base de datos, pero se calcula dinámicamente según el nivel.
     * * He definido una curva de dificultad exponencial: 
     * Nivel 1 = 100 XP, Nivel 2 = 200 XP, Nivel 3 = 400 XP, etc.
     * Esto hace que cada nivel sea el doble de difícil que el anterior.
     */
    public function getMaxExperienceAttribute(): int
    {
        return 100 * (2 ** ($this->level - 1));
    }
}