<?php

namespace App\Policies;

use App\Models\Task;
use App\Models\User;

/**
 * TaskPolicy: Define quién puede realizar acciones sobre las tareas.
 * Implementa la lógica de autorización para asegurar la privacidad: 
 * "Mis tareas son solo mías".
 */
class TaskPolicy
{
    /**
     * Determina si el usuario puede ver su propio listado de tareas.
     * Permitimos el acceso (true) ya que el filtrado por 'user_id' 
     * se realiza a nivel de consulta en el controlador.
     */
    public function viewAny(User $user): bool
    {
        return true; 
    }

    /**
     * Determina si el usuario puede ver los detalles de una tarea concreta.
     * Verificamos que el ID del usuario autenticado coincida con el 
     * propietario de la tarea (user_id).
     */
    public function view(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    /**
     * Determina si el usuario tiene permiso para crear nuevas tareas.
     * Retornamos true para cualquier usuario que haya superado el middleware de auth.
     */
    public function create(User $user): bool
    {
        return true; 
    }

    /**
     * Determina si el usuario puede modificar una tarea existente.
     * Es vital comprobar la propiedad para evitar que un usuario edite 
     * tareas de otros modificando los parámetros de la petición HTTP.
     */
    public function update(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    /**
     * Determina si el usuario puede eliminar una tarea.
     * Solo el creador de la misión tiene el privilegio de completarla/eliminarla.
     */
    public function delete(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    /**
     * Lógica para restaurar tareas eliminadas (si se usara Soft Deletes).
     */
    public function restore(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }

    /**
     * Determina si el usuario puede purgar físicamente la tarea de la base de datos.
     */
    public function forceDelete(User $user, Task $task): bool
    {
        return $user->id === $task->user_id;
    }
}