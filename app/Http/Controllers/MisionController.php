<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

/**
 * MisionController: Gestiona las vistas principales de la experiencia de usuario.
 * Este controlador centraliza la lógica de las "misiones", la "bitácora" y el perfil 
 * del "personaje", integrando los elementos de gamificación del proyecto.
 */
class MisionController extends Controller
{
    /**
     * Método invocado para mostrar la página principal de misiones.
     * He utilizado el método mágico __invoke para que este controlador pueda ser 
     * llamado como una acción única si fuera necesario, simplificando el routing.
     */
    public function __invoke(): Response
    {
        // Recupero las tareas del usuario autenticado cargando la relación 'category' 
        // mediante Eager Loading para evitar el problema de consultas N+1.
        $tasks = Auth::user()->tasks()
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('frequency'); // Agrupo por frecuencia para organizarlas en la UI (diarias, semanales, etc.)

        // Renderizado a través de Inertia para enviar los datos al componente Vue/React 'misiones'
        return Inertia::render('misiones', [
            'tasks' => $tasks,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Renderiza la página de la Bitácora del usuario.
     * Muestra el histórico de tareas y el estado actual del personaje del usuario.
     */
    public function bitacora(): Response
    {
        // Aplicamos la misma lógica de recuperación de tareas optimizada
        $tasks = Auth::user()->tasks()
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('frequency');

        return Inertia::render('bitacora', [
            'tasks' => $tasks,
            'categories' => Category::all(),
            'character' => Auth::user()->character, // Enviamos el modelo character para mostrar estadísticas
        ]);
    }

    /**
     * Renderiza la vista de perfil del Personaje.
     * Devuelve exclusivamente los datos estadísticos y visuales del personaje del usuario.
     */
    public function personaje(): Response
    {
        return Inertia::render('personaje', [
            'character' => Auth::user()->character,
        ]);
    }
}