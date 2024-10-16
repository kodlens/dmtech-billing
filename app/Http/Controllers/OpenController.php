<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;

class OpenController extends Controller
{
    //

    public function loadCategories(Request $req){
        return Category::orderBy('category', 'asc')
            ->where('active', 1)
            ->get();
    }

    public function loadAcademicYears(Request $req){
        return AcademicYear::orderBy('academic_year_code', 'desc')
            ->get();
    }
}
