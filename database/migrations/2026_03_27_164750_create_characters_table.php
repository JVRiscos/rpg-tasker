<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * Migración para la tabla 'characters'.
 * Define la entidad del personaje que representa al usuario dentro del sistema 
 * de gamificación, almacenando su progresión y atributos RPG.
 */
return new class extends Migration
{
    /**
     * Creación de la tabla 'characters' y sus restricciones.
     */
    public function up(): void
    {
        Schema::create('characters', function (Blueprint $table) {
            // ID único autoincremental para el personaje.
            $table->id();

            // Relación Uno a Uno con el usuario.
            // He añadido 'unique()' para garantizar que un usuario no pueda 
            // tener más de un personaje activo simultáneamente.
            // 'onDelete('cascade')' borra el personaje si el usuario elimina su cuenta.
            $table->foreignId('user_id')->unique()->constrained()->onDelete('cascade');

            // Nombre del personaje (personalizado por el usuario).
            $table->string('name');

            // Clase o profesión del personaje. 
            // Uso el método 'comment' para que en la base de datos quede claro 
            // qué tipo de valores esperamos recibir.
            $table->string('job_class')->comment('Guerrero, Mago, etc.');

            // Sistema de niveles: empezamos en el nivel 1 por defecto.
            $table->integer('level')->default(1);

            // Experiencia acumulada: se inicializa en 0 al crear el personaje.
            $table->integer('experience')->default(0);

            // Estadísticas básicas (Atributos): 
            // str (Fuerza), int (Inteligencia) y vit (Vitalidad).
            // Se inicializan a 0 para que el usuario las suba completando misiones.
            $table->integer('str')->default(0);
            $table->integer('int')->default(0);
            $table->integer('vit')->default(0);

            // Registro de marcas de tiempo para creación y última actualización.
            $table->timestamps();
        });
    }

    /**
     * Elimina la tabla 'characters' si se revierte la migración.
     */
    public function down(): void
    {
        Schema::dropIfExists('characters');
    }
};