<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StatusPair extends Model
{
    use HasFactory;

    protected $table = 'status_pairs';
    //protected $primaryKey = 'id';
    
    protected $fillable = [
        'status_id',
        'role_id'
    ];

    public function status(){
        return $this->belongsTo(Status::class);
    }

    public function role(){
        return $this->belongsTo(Role::class);
    }
}
