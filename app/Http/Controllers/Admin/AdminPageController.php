<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Page;


class AdminPageController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Page/AdminPageIndex');
    }

    public function getData(Request $req){

        $sort = explode('.', $req->sort_by);
       
        return Page::where('name', 'like', '%'. $req->search . '%')
            ->orderBy('id', 'desc')
            ->paginate($req->perpage);
    }

}
