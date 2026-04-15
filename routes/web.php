<?php

/**
 * Archivo: routes/web.php
 * Propósito: Definir todas las URLs de la aplicación y proteger el acceso
 * mediante middleware (filtros de seguridad).
 */

use App\Http\Controllers\MisionController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

/*
|--------------------------------------------------------------------------
| Rutas Públicas
|--------------------------------------------------------------------------
| Estas rutas son accesibles para cualquier visitante (sin login).
*/

Route::inertia('/', 'welcome', [
    // Pasamos a la vista si el registro está habilitado en la configuración de Fortify
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

/*
|--------------------------------------------------------------------------
| Rutas Protegidas (Requieren Login)
|--------------------------------------------------------------------------
| El middleware 'auth' asegura que solo usuarios logueados entren.
| 'verified' asegura que hayan confirmado su correo si es necesario.
*/

Route::middleware(['auth', 'verified'])->group(function () {
    
    // VISTAS PRINCIPALES DEL RPG
    // MisionController maneja la lógica de XP, niveles y visualización
    Route::get('bitacora', [MisionController::class, 'bitacora'])->name('bitacora');
    Route::get('personaje', [MisionController::class, 'personaje'])->name('personaje');
    Route::get('misiones', MisionController::class)->name('misiones');
    
    // VISTAS ESTÁTICAS (Inertia::render directo sin controlador)
    // Se usan para páginas que no requieren datos complejos del servidor al cargar
    Route::inertia('tienda', 'tienda')->name('tienda');
    Route::inertia('ajustes', 'ajustes')->name('ajustes');

    /*
    |--------------------------------------------------------------------------
    | CRUD de Tareas (Sistema de Misiones)
    |--------------------------------------------------------------------------
    | Route::resource crea automáticamente las rutas para:
    | GET    /tasks          -> index   (lista)
    | POST   /tasks          -> store   (crear)
    | PUT    /tasks/{id}     -> update  (editar/completar)
    | DELETE /tasks/{id}     -> destroy (borrar)
    */
    Route::resource('tasks', TaskController::class);
});

/*
|--------------------------------------------------------------------------
| Rutas Adicionales
|--------------------------------------------------------------------------
*/

// Carga las rutas de configuración de perfil/password (ajustes del sistema)
require __DIR__.'/settings.php';