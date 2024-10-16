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
                'due_date' => 0,
                'address' => 'Tangub City, Misamis Occidental',
                'active' => 1,
                'date_connected' => '2024-08-06'
            ],

            [
                'username' => 'user01',
                'lname' => 'Amparado',
                'fname' => 'Etienne',
                'mname' => '',
                'sex' => 'MALE',
                'email' => 'user01@dmtech.org',
                'password' => Hash::make('a'),
                'role' => 'USER',
                'due_date' => 15,
                'address' => 'Tangub City, Misamis Occidental',
                'active' => 1,
                'date_connected' => '2024-08-06'
            ],
            [
                'username' => 'user02',
                'lname' => 'Cagadas',
                'fname' => 'John Michael',
                'mname' => '',
                'sex' => 'MALE',
                'email' => 'user02@dmtech.org',
                'password' => Hash::make('a'),
                'role' => 'USER',
                'due_date' => 15,
                'address' => 'Tangub City, Misamis Occidental',
                'active' => 1,
                'date_connected' => '2024-08-08'
            ],
            [
                'username' => 'user03',
                'lname' => 'Docoy',
                'fname' => 'Godillo',
                'mname' => '',
                'sex' => 'MALE',
                'email' => 'user03@dmtech.org',
                'password' => Hash::make('a'),
                'role' => 'USER',
                'due_date' => 30,
                'address' => 'Tangub City, Misamis Occidental',
                'active' => 1,
                'date_connected' => '2024-08-10'
            ],
            [
                'username' => 'user04',
                'lname' => 'Cordovan',
                'fname' => 'Quincy',
                'mname' => '',
                'sex' => 'FEMALE',
                'email' => 'user04@dmtech.org',
                'password' => Hash::make('a'),
                'role' => 'USER',
                'due_date' => 30,
                'address' => 'Tangub City, Misamis Occidental',
                'active' => 1,
                'date_connected' => '2024-08-14'
            ],
        ];

        \App\Models\User::insertOrIgnore($users);
    }
}
