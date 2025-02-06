<?php

namespace App\Models;

use App\Models\Pembayaran;
use Illuminate\Database\Eloquent\Model;

class Pesanan extends Model
{
    protected $table = "pesanan";
    protected $fillable = [
        'id_pelanggan',
        'id_buku',
        'jumlah_pesanan',
        'tanggal_pesanan'
    ];

    public function pelanggan()
    {
        return $this->belongsTo(Pelanggan::class);
    }

    public function buku()
    {
        return $this->belongsTo(Buku::class);
    }

    public function pengiriman()
    {
        return $this->hasOne(Pembayaran::class);
    }
}
