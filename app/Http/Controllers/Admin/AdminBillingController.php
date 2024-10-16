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
        return Inertia::render('Admin/Billing/AdminBillingIndex');
    }

    public function getData(Request $req){

        return Billing::with(['consumer'])
            ->where('username', 'like', $req->lastname . '%')
            ->where('lastname', 'like', $req->lastname . '%')
            ->paginate($req->perpage);
    }
}
