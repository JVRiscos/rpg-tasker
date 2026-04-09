<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Character;
use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        $character = Character::create([
            'user_id' => $user->id,
            'name' => 'Test Character',
            'job_class' => 'Warrior',
            'level' => 1,
            'experience' => 0,
            'str' => 0,
            'int' => 0,
            'vit' => 0,
        ]);

        $category = Category::create([
            'name' => 'Fuerza (STR)',
            'base_xp' => 5,
            'linked_stat' => 'str',
        ]);

        Category::create([
            'name' => 'Inteligencia (INT)',
            'base_xp' => 5,
            'linked_stat' => 'INT',
        ]);

        Category::create([
            'name' => 'Vitalidad (VIT)',
            'base_xp' => 5,
            'linked_stat' => 'VIT',
        ]);

        Task::factory()
            ->count(100)
            ->create([
                'user_id' => $user->id,
                'category_id' => $category->id,
            ]);
    }
}
