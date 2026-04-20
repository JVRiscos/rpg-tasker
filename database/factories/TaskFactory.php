<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    protected static array $exampleTasks = [
        [
            'title' => 'Entrenar con espada',
            'description' => 'Practicar ataques y defensas básicas para mejorar el nivel de combate.',
            'frequency' => 'daily',
            'is_completed' => false,
        ],
        [
            'title' => 'Explorar el bosque antiguo',
            'description' => 'Buscar recursos y descubrir caminos secretos en el bosque.',
            'frequency' => 'weekly',
            'is_completed' => false,
        ],
        [
            'title' => 'Reparar armadura',
            'description' => 'Llevar la armadura a la herrería para arreglar las piezas dañadas.',
            'frequency' => 'once',
            'is_completed' => false,
        ],
        [
            'title' => 'Recoger hierbas curativas',
            'description' => 'Cosechar plantas para preparar pociones y vendajes.',
            'frequency' => 'daily',
            'is_completed' => false,
        ],
        [
            'title' => 'Completar misión de la abuela',
            'description' => 'Ayudar a los aldeanos con tareas especiales y ganar reputación.',
            'frequency' => 'weekly',
            'is_completed' => false,
        ],
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return array_merge(
            fake()->randomElement(self::$exampleTasks),
            [
                'user_id' => User::factory(),
                'category_id' => 1,
            ]
        );
    }
}
