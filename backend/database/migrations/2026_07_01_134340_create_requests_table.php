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
    Schema::create('requests', function (Blueprint $table) {
        $table->id();

        // user who created the request
        $table->foreignId('user_id')
               ->constrained('users')
               ->onDelete('cascade');

        // resource being requested
        $table->foreignId('resource_id')
               ->constrained('resources')
               ->onDelete('cascade');

         // admin who approved/rejected — nullable until a decision is made
        $table->foreignId('reviewed_by')
               ->nullable()
               ->constrained('users')
               ->onDelete('set null');

        $table->dateTime('start_date');
        $table->dateTime('end_date');

        $table->enum('status', [
            'pending',
            'approved',
            'rejected',
            'completed',
            'cancelled'
        ])->default('pending');

        // optional notes from the collaborator when creating
        $table->text('observations')->nullable();

        // admin notes when approving or rejecting
        $table->text('admin_notes')->nullable();

        $table->timestamps();
    });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('requests');
    }
};
