<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * TaskFactory: Clase encargada de generar datos de prueba para la tabla 'tasks'.
 * He personalizado los datos para que coincidan con la temática RPG del proyecto,
 * lo que facilita las pruebas de interfaz y de lógica de negocio.
 */
class TaskFactory extends Factory
{
    /**
     * El modelo que este factory representa.
     */
    protected $model = Task::class;

    /**
     * Array de tareas de ejemplo con temática de aventura.
     * He definido esto manualmente para que la aplicación tenga un aspecto
     * profesional y coherente durante las demostraciones.
     */
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
     * Define el estado por defecto del modelo.
     * Combina una tarea aleatoria de nuestro array con las claves foráneas necesarias.
     * * @return array<string, mixed>
     */
    public function definition(): array
    {
        return array_merge(
            // Selecciona una de las tareas temáticas predefinidas
            fake()->randomElement(self::$exampleTasks),
            [
                // Crea automáticamente un usuario si no se le pasa uno
                'user_id' => User::factory(),
                
                // Por defecto asignamos la categoría 1 (que suele ser la básica)
                'category_id' => 1,
            ]
        );
    }
}