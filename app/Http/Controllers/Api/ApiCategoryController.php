<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class ApiCategoryController extends Controller
{
    public function loadCategories(){
        return Category::orderBy('title', 'asc')->get();
    }
    
}
