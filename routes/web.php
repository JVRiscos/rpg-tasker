<?php

use App\Http\Controllers\MisionController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('bitacora', [MisionController::class, 'bitacora'])->name('bitacora');
    Route::inertia('personaje', 'personaje')->name('personaje');
    Route::get('misiones', MisionController::class)->name('misiones');
    Route::inertia('tienda', 'tienda')->name('tienda');
    Route::inertia('ajustes', 'ajustes')->name('ajustes');

    Route::resource('tasks', TaskController::class);
});

require __DIR__.'/settings.php';
