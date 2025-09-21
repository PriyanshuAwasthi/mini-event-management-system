<?php

namespace App\Dtos;

class EventDto
{
    public string $uuid;
    public string $name;
    public string $location;
    public string $start_time;
    public string $end_time;
    public int $max_capacity;


    public function __construct(array $data)
    {
        $this->uuid = $data['uuid'];
        $this->name = $data['name'];
        $this->location = $data['location'];
        $this->start_time = $data['start_time'];
        $this->end_time = $data['end_time'];
        $this->max_capacity = $data['max_capacity'];
    }

    public static function fromModel(\App\Models\Event $event): self
    {
        return new self([
            'uuid' => $event->uuid,
            'name' => $event->name,
            'location' => $event->location,
            'start_time' => $event->start_time,
            'end_time' => $event->end_time,
            'max_capacity' => $event->max_capacity,
        ]);
    }
}