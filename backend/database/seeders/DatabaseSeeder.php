<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Resource;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */

        public function run(): void
{
        // Admin account
    User::create([
        'name'     => 'Administrator',
        'email'    => 'admin@company.com',
        'password' => Hash::make('password'),
        'role'     => 'admin',
        ]);

         // Collaborator accounts
    User::create([
            'name'     => 'Jon Snow',
            'email'    => 'jon@winterfell.com',
            'password' => Hash::make('thewall'),
            'role'     => 'collaborator',
        ]);

    User::create([
            'name'     => 'Walter White',
            'email'    => 'walt@bluecrystal.com',
            'password' => Hash::make('heisenberg'),
            'role'     => 'collaborator',
        ]);

    // Sample resources
    Resource::create([
        'name'        => 'Meeting Room A',
        'type'        => 'space',
        'description' => 'Room for 10 people with projector',
    ]);

    Resource::create([
            'name'        => 'Batmobile',
            'type'        => 'vehicle',
            'description' => 'The Dark Knight\'s iconic vehicle, fully equipped with gadgets',
        ]);

    Resource::create([
        'name'        => 'Projector',
        'type'        => 'equipment',
        'description' => 'Portable HD projector',
    ]);

    }
}
