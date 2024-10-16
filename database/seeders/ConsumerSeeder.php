<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class ConsumerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'username' => 'user01',
                'account_no' => '20240002',
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
                'account_no' => '20240003',
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
                'account_no' => '20240004',
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
                'account_no' => '20240005',
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

        \App\Models\Consumer::insertOrIgnore($users);
    }
}
