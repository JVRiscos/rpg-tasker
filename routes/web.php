<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::inertia('personaje', 'personaje')->name('personaje');
    Route::inertia('misiones', 'misiones')->name('misiones');
    Route::inertia('tienda', 'tienda')->name('tienda');
    Route::inertia('ajustes', 'ajustes')->name('ajustes');
});

require __DIR__.'/settings.php';
