<?php

namespace App\Http\Controllers\Author;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AuthorDashboardController extends Controller
{
    //
    public function index(){
        return Inertia::render('Author/AuthorDashboard');
    }

    
}
