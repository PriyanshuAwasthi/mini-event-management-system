<?php

namespace App\Dtos;


use App\Dtos\EventDto;
use Illuminate\Database\Eloquent\Collection;

class GetEventListResponseDto
{
    public array $events;
    public string $code;

    public function __construct(string $code, Collection $data)
    {
        $this->events = $data->map(fn($event) => EventDto::fromModel($event))->toArray();
        $this->code = $code;
    }
}

