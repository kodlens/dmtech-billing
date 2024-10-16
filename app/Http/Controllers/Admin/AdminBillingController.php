<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;


class AdminBillingController extends Controller
{
    //
    public function index(){
        return Inertia::render('Admin/Billing/BillingIndex');
    }

    public function getData(Request $req){

        return User::where('username', 'like', $req->lastname . '%')
            ->where('lastname', 'like', $req->lastname . '%')
            ->paginate($req->perpage);
    }
}
