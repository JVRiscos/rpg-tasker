<?php

namespace App\Models;

use Database\Factories\CategoryFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Modelo Category: Representa las categorías de las tareas.
 * Es una pieza central para la gamificación, ya que cada categoría 
 * define cuánta experiencia otorga y qué estadística mejora.
 */
#[Fillable(['name', 'base_xp', 'linked_stat'])]
class Category extends Model
{
    /** * Uso del trait HasFactory para permitir la generación de datos 
     * de prueba (Seeders) mediante CategoryFactory.
     */
    use HasFactory;

    /**
     * Definición de los castings de Eloquent.
     * Nos aseguramos de que 'base_xp' se trate siempre como un entero al 
     * acceder a él, evitando problemas de tipos en los cálculos de nivel.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'base_xp' => 'integer',
        ];
    }

    /**
     * Relación Uno a Muchos (1:N) con el modelo Task.
     * Una categoría puede estar presente en muchas tareas diferentes.
     * Esto nos permite, por ejemplo, obtener todas las tareas de 'Estudios' 
     * con un simple $category->tasks.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }
}