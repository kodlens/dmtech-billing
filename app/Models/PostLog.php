<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PostLog extends Model
{
    use HasFactory;

    
    protected $fillable = [
        'user_id',
        'post_id',
        'alias',
        'description',
        'action',
    ];

}
