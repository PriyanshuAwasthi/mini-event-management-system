<?php

namespace App\Dtos;

class PostEventDto {
    public string $name;
    public string $location;
    public string $start_time;
    public string $end_time;
    public int $max_capacity;
    public int $id;

    public function __construct(array $data)
    {
        $this->name = $data['name'];
        $this->location = $data['location'];
        $this->start_time = $data['start_time'];
        $this->end_time = $data['end_time'];
        $this->max_capacity = $data['max_capacity'];
        $this->id = $data['created_by'];
    }
}