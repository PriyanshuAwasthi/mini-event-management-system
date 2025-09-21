<?php

namespace App\Dtos;

use App\Models\Event;
use App\Dtos\EventDto;

class PostEventResponseDto
{
    public string $code;
    public EventDto $event;

    public function __construct(string $code, Event $data)
    {
        $this->code = $code;
        $this->event = EventDto::fromModel($data);
    }
}
