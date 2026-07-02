<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Request extends Model
{
    protected $fillable = [
        'user_id',
        'resource_id',
        'reviewed_by',
        'start_date',
        'end_date',
        'status',
        'observations',
        'admin_notes',
    ];

    // who created the request
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    // who reviewed it
    public function reviewer()
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    // which resource
    public function resource()
    {
        return $this->belongsTo(Resource::class);
    }
}