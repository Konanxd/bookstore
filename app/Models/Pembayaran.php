<?php

namespace App\Models;

use App\Models\Pesanan;
use Illuminate\Database\Eloquent\Model;

class Pembayaran extends Model
{
    protected $table = "pembayaran";
    protected $fillable = [
        'id_pesanan',
        'tanggal_pembayaran',
        'total_pembayaran',
        'metode_pembayaran'
    ];

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class);
    }

    public function pengiriman()
    {
        return $this->hasOne(Pengiriman::class);
    }
}
