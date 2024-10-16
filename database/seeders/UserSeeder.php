<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $users = [
            [
                'username' => 'admin',
                'lname' => 'FABRIA',
                'fname' => 'MAFT JESSIE JAMES',
                'mname' => '',
                'sex' => 'MALE',
                'email' => 'admin@dmtech.org',
                'password' => Hash::make('a'),
                'role' => 'ADMINISTRATOR',
                'active' => 1,
            ],

        ];

        \App\Models\User::insertOrIgnore($users);
    }
}
