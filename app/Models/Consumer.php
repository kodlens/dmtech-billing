<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consumer extends Model
{
    use HasFactory;

    protected $fillable = [
        'username',
        'password',
        'account_no',
        'fname',
        'lname',
        'mname',
        'email',
        'sex',
        'role',
        'due_date',
        'address',
        'active',
        'date_connected',
    ];


}
