<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    use HasFactory;

    protected $table = 'sections';
    //protected $primaryKey = 'id';
    
    protected $fillable = [
        'section',
        'section_key',
        'order_no',
        'active'
    ];

}
