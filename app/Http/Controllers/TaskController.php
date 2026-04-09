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

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
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
     * Show the form for creating a new resource.
     */
    public function create(): Response
    {
        return Inertia::render('tasks/create', [
            'categories' => Category::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request): RedirectResponse
    {
        $task = Auth::user()->tasks()->create($request->validated());

        return redirect()->back()
            ->with('success', 'Tarea creada exitosamente.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task): Response
    {
        $this->authorize('view', $task);

        return Inertia::render('tasks/show', [
            'task' => $task->load('category', 'user'),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
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
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task): RedirectResponse
    {
        $this->authorize('update', $task);

        $task->update($request->validated());

        return redirect()->back()
            ->with('success', 'Tarea actualizada exitosamente.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task): RedirectResponse
    {
        $this->authorize('delete', $task);

        // Add XP to user's character
        $character = $task->user->character;
        if ($character) {
            $character->increment('experience', $task->category->base_xp);

            // Check for level up
            $max = $character->max_experience;
            while ($character->experience >= $max) {
                $character->experience -= $max;
                $character->level += 1;
                $max = 100 * (2 ** ($character->level - 1));
            }
            $character->save();
        }

        $task->delete();

        return redirect()->back()
            ->with('success', 'Tarea completada exitosamente.');
    }
}
