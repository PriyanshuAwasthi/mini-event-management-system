<?php

namespace App\Dtos;

class UserDto
{
    public string $name;
    public string $email;
    public bool $isAdmin;

    public function __construct(array $data)
    {
        $this->name = $data['name'];
        $this->email = $data['email'];
        $this->isAdmin = $data['isAdmin'];
    }

    public static function fromModel(\App\Models\User $user): self
    {
        return new self([
            'name' => $user->name,
            'email' => $user->email,
            'isAdmin' => $user->isAdmin,
        ]);
    }
}