<?php

namespace Database\Seeders;

use App\Models\Category;
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

        $category = Category::create([
            'name' => 'General',
            'base_xp' => 10,
            'linked_stat' => 'str',
        ]);

        Task::factory()
            ->count(5)
            ->create([
                'user_id' => $user->id,
                'category_id' => $category->id,
            ]);
    }
}
