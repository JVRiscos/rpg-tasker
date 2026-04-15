<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

/**
 * CategoryPolicy: Gestiona los permisos de acceso para el modelo Category.
 * En mi proyecto, las categorías son parte de la configuración del sistema (semillas),
 * por lo que he restringido el acceso de escritura a los usuarios estándar
 * para proteger la integridad de la lógica de gamificación.
 */
class CategoryPolicy
{
    /**
     * Determina si el usuario puede ver el listado de categorías.
     * Retorna false porque, en este caso, el listado se gestiona internamente
     * o a través de otros controladores específicos.
     */
    public function viewAny(User $user): bool
    {
        return false;
    }

    /**
     * Determina si el usuario puede ver una categoría concreta.
     */
    public function view(User $user, Category $category): bool
    {
        return false;
    }

    /**
     * Determina si el usuario puede crear nuevas categorías.
     * He denegado este permiso (false) para que solo un administrador (vía BD o Seeder)
     * pueda darlas de alta, evitando que los jugadores alteren el balance del juego.
     */
    public function create(User $user): bool
    {
        return false;
    }

    /**
     * Determina si el usuario puede modificar una categoría existente.
     */
    public function update(User $user, Category $category): bool
    {
        return false;
    }

    /**
     * Determina si el usuario puede eliminar una categoría.
     * Denegado por seguridad: si se borra una categoría, las tareas asociadas quedarían huérfanas.
     */
    public function delete(User $user, Category $category): bool
    {
        return false;
    }

    /**
     * Determina si el usuario puede restaurar una categoría eliminada (Soft Delete).
     */
    public function restore(User $user, Category $category): bool
    {
        return false;
    }

    /**
     * Determina si el usuario puede eliminar permanentemente una categoría.
     */
    public function forceDelete(User $user, Category $category): bool
    {
        return false;
    }
}