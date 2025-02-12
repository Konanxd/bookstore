<?php

namespace App\Models;

use App\Models\Buku;
use Illuminate\Database\Eloquent\Model;

class PesananBuku extends Model
{
    protected $table = "pesanan_buku";
    protected $fillable = [
        'id_pesanan',
        'id_buku',
        'jumlah_pesanan',
    ];

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class);
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class);
    }
}
