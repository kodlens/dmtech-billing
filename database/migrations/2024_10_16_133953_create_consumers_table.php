<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('consumers', function (Blueprint $table) {
            $table->id();
            $table->string('username', 30)->unique();
            $table->string('account_no', 30)->nullable();
            $table->string('lname')->nullabe();
            $table->string('fname')->nullabe();
            $table->string('mname')->nullabe();
            $table->string('sex', 10)->nullable();
            $table->string('role', 20)->nullable();
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('address')->nullable();
            $table->integer('due_date')->default(0);
            $table->tinyInteger('active')->nullable()->default(1);
            $table->date('date_connected')->nullable();
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('consumers');
    }
};
