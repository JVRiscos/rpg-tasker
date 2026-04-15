<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración para la tabla 'tasks'.
 * Define la estructura física de la tabla en la base de datos, 
 * gestionando tanto la creación como el borrado (rollback) de la misma.
 */
return new class extends Migration
{
    /**
     * Ejecuta las operaciones necesarias para crear la tabla.
     * Aquí definimos cada columna, sus tipos de datos y sus restricciones.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            // ID autoincremental como clave primaria.
            $table->id();

            // Clave foránea hacia la tabla 'users'.
            // 'constrained()' detecta automáticamente la relación.
            // 'onDelete('cascade')' asegura que si un usuario se borra, sus tareas también.
            $table->foreignId('user_id')->constrained()->onDelete('cascade');

            // Clave foránea hacia la tabla 'categories'.
            // Vincula la tarea con su tipo para la lógica de recompensas (XP).
            $table->foreignId('category_id')->constrained();

            // Título de la misión (cadena de caracteres estándar).
            $table->string('title');

            // Descripción larga de la misión. Usamos 'text' para permitir más contenido.
            // Es 'nullable' porque el usuario puede elegir no poner detalles.
            $table->text('description')->nullable();

            // Estado de la tarea. Por defecto, toda tarea nueva empieza sin completar.
            $table->boolean('is_completed')->default(false);

            // Almacena la periodicidad: 'daily', 'weekly' o 'once'.
            // Es vital para la lógica de refresco de misiones en el juego.
            $table->string('frequency'); 

            // Crea automáticamente las columnas 'created_at' y 'updated_at'.
            // Útil para ordenar las misiones por fecha de creación.
            $table->timestamps();
        });
    }

    /**
     * Revierte la migración.
     * Elimina la tabla de la base de datos si decidimos hacer un 'rollback'.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};