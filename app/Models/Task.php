<?php

namespace App\Models;

use Database\Factories\TaskFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * Modelo Task: Representa las misiones o tareas individuales de los usuarios.
 * Es el componente principal para la interacción del usuario con el sistema 
 * de gamificación, vinculando acciones con recompensas.
 */
#[Fillable(['user_id', 'category_id', 'title', 'description', 'is_completed', 'frequency'])]
class Task extends Model
{
    /** * Habilito el uso de factories para poder generar juegos de datos 
     * de prueba masivos durante la fase de desarrollo y testing.
     */
    use HasFactory;

    /**
     * Definición de conversiones de tipos (Casting).
     * Laravel gestiona el campo 'is_completed' como un booleano (true/false) 
     * aunque en la base de datos se almacene como un entero (0 o 1).
     */
    protected function casts(): array
    {
        return [
            'is_completed' => 'boolean',
        ];
    }

    /**
     * Relación de Pertenencia (N:1) con el Usuario.
     * Define que cada tarea pertenece exclusivamente a un usuario. 
     * Esto permite filtrar fácilmente las misiones en el perfil de cada jugador.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relación de Pertenencia (N:1) con la Categoría.
     * Cada tarea está clasificada en una categoría (ej: Salud, Trabajo, Ocio).
     * Esto es fundamental para determinar qué estadística (stat) se verá 
     * afectada y cuánta experiencia base otorgará al completarse.
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo('App\Models\Category');
    }
}   