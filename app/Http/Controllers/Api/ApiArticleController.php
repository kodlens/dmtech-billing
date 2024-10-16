<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class ApiArticleController extends Controller
{
    public function index(){
        
    }
    
    public function loadArticles(Request $req){
        return Post::with('category')->orderBy('id', 'desc')
            ->select('id', 'slug', 'title', 'excerpt', 'description','featured_image', 'image_caption', 'category_id')
            ->take(10)->get();
    }






    /*================API to call featured articles===================
     if done debugging, set this to article that is publish and 
     is_featured is true and order by featured_order_no ascending
    */
    public function loadFeaturedArticles(Request $req){
        return Post::with('category')->orderBy('id', 'desc')
            ->select('id', 'slug', 'title', 'excerpt', 'description','featured_image', 'image_caption', 'category_id')
            ->take(5)->get();
    }
    /*=============================================================*/



    /*================API to call latest articles===================
     if done debugging, set this to article that is publish and 
     is_featured is true and order by featured_order_no ascending
    */
    public function loadLatestArticles(Request $req){
        return Post::with('category')->orderBy('id', 'desc')
            ->select('id', 'slug', 'title', 'excerpt', 'description','featured_image', 'image_caption', 'category_id')
            ->take(4)->get();
    }





    public function fetchArticle($slug){
        return Post::with(['category', 'quarter', 'author'])->where('slug', $slug)->first();
    }
}
