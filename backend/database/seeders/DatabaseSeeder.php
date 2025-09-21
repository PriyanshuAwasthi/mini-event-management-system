<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Event;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Create 20 users
        $users = User::factory(20)->create();

        // Create 10 events
        Event::factory(10)->create()->each(function ($event) use ($users) {
            // Randomly attach 5-15 users as attendees
            $event->attendees()->attach(
                $users->random(rand(5, 15))->pluck('id')->toArray()
            );
        });
    }
}
