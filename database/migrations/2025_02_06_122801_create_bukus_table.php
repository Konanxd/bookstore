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
        Schema::create('buku', function (Blueprint $table) {
            $table->id('id_buku');
            $table->string('judul')->unique();
            $table->unsignedBigInteger('id_penulis');
            $table->string('isbn', 13);
            $table->unsignedBigInteger('id_penerbit');
            $table->date('tanggal_terbit');
            $table->unsignedBigInteger('id_genre');
            $table->integer('harga');
            $table->integer('stok');
            $table->timestamps();

            $table->foreign('id_penulis')->references('id_penulis')->on('penulis');
            $table->foreign('id_penerbit')->references('id_penerbit')->on('penerbit');
            $table->foreign('id_genre')->references('id_genre')->on('genre');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bukus');
    }
};
