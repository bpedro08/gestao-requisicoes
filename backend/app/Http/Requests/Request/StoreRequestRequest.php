<?php

namespace App\Http\Requests\Request;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequestRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // any authenticated user can create a request
    }

    public function rules(): array
    {
        return [
            'resource_id'  => ['required', 'integer', 'exists:resources,id'],
            'start_date'   => ['required', 'date', 'after_or_equal:today'],
            'end_date'     => ['required', 'date', 'after:start_date'],
            'observations' => ['nullable', 'string'],
        ];
    }
}