<?php

namespace App\Models;

use App\Models\Pesanan;
use Illuminate\Database\Eloquent\Model;

class Pengiriman extends Model
{
    protected $table = "pengiriman";
    protected $fillable = [
        'id_pembayaran',
        'id_pesanan',
        'tanggal_pengiriman',
        'status_pengiriman',
        'no_resi',
    ];

    public function pembayaran()
    {
        return $this->belongsTo(Pembayaran::class);
    }

    public function pesanan()
    {
        return $this->belongsTo(Pesanan::class);
    }
}
