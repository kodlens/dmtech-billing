<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminPageBannerController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Pages/Banner/AdminBannerIndex');
    }

    public function create(){
        return Inertia::render('Admin/Pages/Banner/AdminBannerCreateEdit');
    }
}
