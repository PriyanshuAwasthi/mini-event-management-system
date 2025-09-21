<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Models\User;

class EventFactory extends Factory
{
    protected $model = \App\Models\Event::class;

    public function definition(): array
    {
        return [
            'uuid' => Str::uuid(),
            'name' => $this->faker->sentence(3),
            'location' => $this->faker->city(),
            'start_time' => $this->faker->dateTimeBetween('+1 days', '+1 month'),
            'end_time' => $this->faker->dateTimeBetween('+1 month', '+2 months'),
            'max_capacity' => $this->faker->numberBetween(10, 200),
            'created_by' => User::factory(), // create a random user if none exists
        ];
    }
}
