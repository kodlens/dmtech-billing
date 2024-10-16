<?php

namespace App\Http\Controllers\Admin\Pages;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Dostv;

class AdminDostvController extends Controller
{
    public function index(){
        return Inertia::render('Admin/Pages/Dostv/DostvIndex');
    }

    public function getData(Request $req){
        $sort = explode('.', $req->sort_by);

        $data = Dostv::where('title', 'like', $req->title . '%')
            ->orderBy($sort[0], $sort[1])
            ->paginate($req->perpage);

        return $data;
    }


    public function create(){ 
        return Inertia::render('Admin/Pages/Dostv/DostvCreateEdit',[
            'id' => 0,
            'dostv' => null
        ]);
    }


    public function store(Request $req){

        $req->validate([
            'title' => ['required', 'string', 'max:255', 'unique:dostvs'],
            'excerpt' => ['required', 'string'],
            'link' => ['required'],
            'order_no' => ['required', 'unique:dostvs'],
        ]);

        Dostv::create([
            'title' => $req->title,
            'excerpt' => $req->excerpt,
            'link' => $req->link,
            'order_no' => $req->order_no,
            'is_featured' => $req->is_featured ? 1 : 0,
        ]);

        return response()->json([
            'status' => 'saved'
        ], 200);
    }



    public function edit($id){ 
        $data = Dostv::find($id);

        return Inertia::render('Admin/Pages/Dostv/DostvCreateEdit',[
            'id' => $id,
            'dostv' => $data
        ]);
    }


    public function update(Request $req, $id){

        $req->validate([
            'title' => ['required', 'string', 'max:255', 'unique:dostvs'],
            'excerpt' => ['required', 'string'],
            'link' => ['required'],
            'order_no' => ['required', 'unique:dostvs'],
        ]);


        Dostv::where('id', $id)
            ->update([
                'title' => $req->title,
                'excerpt' => $req->excerpt,
                'link' => $req->link,
                'order_no' => $req->order_no,
                'is_featured' => $req->is_featured ? 1 : 0,
            ]);

        return response()->json([
            'status' => 'updated'
        ], 200);
    }

    public function destory($id){
        Dostv::destroy($id);

        return response()->json([
            'status' => 'deleted'
        ], 200);
    }
}
