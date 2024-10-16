<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;


    protected $table = 'posts';
    //protected $primaryKey = 'id';
    
    protected $fillable = [
        'title',
        'excerpt',
        'section_id',
        'description',
        'description_text',
        'slug',
        'featured_image',
        'image_caption',
        'status_id',
        'status',
        'is_archived',
        'is_scheduled',
        'content',
        'year',
        'quarter_id',
        'author_name',
        'author_id',
        'category_id',
        'is_featured',
        'featured_title',
        'tags',
        'publication_date',
        'submitted_date',
        'record_trail',
        'trash'
    ];


    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function author(){
        return $this->belongsTo(User::class, 'author_id');
    }

    public function quarter(){
        return $this->belongsTo(Quarter::class);
    }
    public function status(){
        return $this->belongsTo(Status::class);
    }

    public function postlogs(){
        return $this->hasMany(PostLog::class)
            ->orderBy('id', 'desc');
    }

}
