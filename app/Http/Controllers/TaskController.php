<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Models\Category;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

/**
 * TaskController: Gestiona el CRUD de tareas integrando el sistema de recompensas.
 * He implementado políticas de seguridad (Policies) para asegurar que cada usuario
 * solo pueda manipular sus propias tareas.
 */
class TaskController extends Controller
{
    /**
     * Lista las tareas del usuario actual con paginación.
     * Uso 'paginate' para optimizar la carga en el frontend y no saturar el DOM
     * si el usuario tiene cientos de registros.
     */
    public function index(): Response
    {
        $tasks = Auth::user()->tasks()
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Muestra el formulario de creación de tareas.
     * Pasamos todas las categorías disponibles para que el usuario pueda clasificar su tarea.
     */
    public function create(): Response
    {
        return Inertia::render('tasks/create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Guarda una nueva tarea vinculándola automáticamente al usuario autenticado.
     * Al usar $request->validated(), me aseguro de que solo los datos que han pasado
     * el filtro del StoreTaskRequest entren en la base de datos.
     */
    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $task = Auth::user()->tasks()->create($request->validated());

        return redirect()->back()
            ->with('success', 'Tarea creada exitosamente.');
    }

    /**
     * Muestra una tarea específica.
     * He incluido el método 'authorize' para verificar mediante la Policy (view)
     * que el usuario es el propietario de la tarea antes de mostrarla.
     */
    public function show(Task $task): Response
    {
        $this->authorize('view', $task);

        return Inertia::render('tasks/show', [
            'task' => $task->load('category', 'user'),
        ]);
    }

    /**
     * Muestra el formulario de edición cargando los datos de la tarea.
     */
    public function edit(Task $task): Response
    {
        $this->authorize('update', $task);

        return Inertia::render('tasks/edit', [
            'task' => $task,
            'categories' => Category::all(),
        ]);
    }

    /**
     * Procesa la actualización de la tarea tras validar los cambios.
     */
    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $this->authorize('update', $task);

        $task->update($request->validated());

        return redirect()->back()
            ->with('success', 'Tarea actualizada exitosamente.');
    }

    /**
     * Elimina la tarea y gestiona la lógica de subida de nivel del personaje.
     * Este es el núcleo de la gamificación: al "completar" (borrar) una tarea,
     * el personaje del usuario recibe experiencia basada en la categoría de la tarea.
     */
    public function destroy(Task $task): RedirectResponse
    {
        // Verificación de seguridad
        $this->authorize('delete', $task);

        $character = $task->user->character;
        if ($character) {
            // Incrementamos la experiencia usando el valor base definido en la categoría
            $character->increment('experience', $task->category->base_xp);

            // Lógica de Level Up: Mientras la XP actual supere el máximo permitido por nivel -->
            $max = $character->max_experience;
            while ($character->experience >= $max) {
                $character->experience -= $max; // --> Restamos la XP gastada para subir -->
                $character->level += 1;         // --> Subimos nivel.
                
                // Cálculo dinámico de dificultad: cada nivel pide más XP (fórmula exponencial)
                $max = 100 * (1.15 ** ($character->level - 1));
            }
            $character->save();
        }

        $task->delete();

        return redirect()->back()
            ->with('success', 'Tarea completada exitosamente.');
    }
}