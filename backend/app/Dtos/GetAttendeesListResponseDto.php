<?php

namespace App\Dtos;


use App\Dtos\UserDto;
use Illuminate\Database\Eloquent\Collection;


class GetAttendeesListResponseDto
{
    public array $attendees;
    public string $code;

    public function __construct(string $code, Collection $data)
    {
        $this->attendees = $data->map(fn($user) => UserDto::fromModel($user))->toArray();
        $this->code = $code;
    }

}