<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; 

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
        'isAdmin',
    ];

    protected $hidden = ['password'];

    protected $casts = [
        'email_verified_at' => 'datetime',
        'isAdmin' => 'boolean',
        'password' => 'hashed',
    ];

    public function createdEvents()
    {
        return $this->hasMany(Event::class, 'created_by');
    }

    public function attendingEvents()
    {
        return $this->belongsToMany(Event::class, 'event_user')->withTimestamps();
    }
}
