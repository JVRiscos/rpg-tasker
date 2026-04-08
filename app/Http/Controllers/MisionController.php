<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MisionController extends Controller
{
    /**
     * Display the misiones page with user's tasks.
     */
    public function __invoke(): Response
    {
        $tasks = Auth::user()->tasks()
            ->with('category')
            ->orderBy('created_at', 'desc')
            ->get()
            ->groupBy('frequency');

        return Inertia::render('misiones', [
            'tasks' => $tasks,
            'categories' => Category::all(),
        ]);
    }
}
