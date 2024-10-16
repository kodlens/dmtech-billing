<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    //protected $table = 'authros';
    //protected $primaryKey = 'id';
    
    protected $fillable = [
        'author',
        'is_active'
    ];


}
