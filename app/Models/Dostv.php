<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Dostv extends Model
{
    use HasFactory;
    
    protected $fillable = [
        'title',
        'excerpt',
        'link',
        'order_no',
        'is_featured'
    ];
}
