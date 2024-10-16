<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Banner;

class MainBannerController extends Controller
{
    public function index(){
    
    }

    public function loadBanner(Request $req){
        return Banner::where('active', 1)->first();
    }
}
