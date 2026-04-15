<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

/**
 * Modelo User: Entidad principal del sistema de autenticación.
 * Gestiona los datos de acceso del usuario y sirve como nodo central
 * para conectar sus tareas y su personaje gamificado.
 */
#[Fillable(['name', 'email', 'password'])]
#[Hidden(['password', 'two_factor_secret', 'two_factor_recovery_codes', 'remember_token'])]
class User extends Authenticatable
{
    /** * Implementación de Traits:
     * - HasFactory: Para generación de usuarios de prueba.
     * - Notifiable: Permite enviar notificaciones (emails, alertas) al usuario.
     * - TwoFactorAuthenticatable: Añade una capa de seguridad extra mediante 2FA.
     */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * Definición de conversiones de tipos (Casting).
     * Destaca el hashing automático del password para asegurar que nunca
     * se almacene en texto plano, cumpliendo con las normativas de seguridad.
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Relación Uno a Muchos (1:N) con Task.
     * Un usuario puede tener múltiples tareas o misiones creadas.
     * Esta relación permite recuperar el listado de tareas del usuario logueado.
     */
    public function tasks(): HasMany
    {
        return $this->hasMany(Task::class);
    }

    /**
     * Relación Uno a Uno (1:1) con Character.
     * Cada usuario tiene un único personaje asignado que representa su progreso.
     * He optado por una relación 1:1 para simplificar la lógica de nivel y estadísticas.
     */
    public function character(): HasOne
    {
        return $this->hasOne(Character::class);
    }
}