<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostEventRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'max_capacity' => 'required|integer|min:1',
            'created_by' => 'required|integer|min:1'
        ];
    }
}
