<?php

namespace App\Models;

use App\Models\Genre;
use Illuminate\Database\Eloquent\Model;

class Buku extends Model
{
    protected $table = "buku";
    protected $fillable = [
        'judul',
        'id_penulis',
        'isbn',
        'id_penerbit',
        'tahun_terbit',
        'id_genre',
        'harga',
        'stok'
    ];

    public function penulis()
    {
        return $this->belongsTo(Penulis::class);
    }

    public function penerbit()
    {
        return $this->belongsTo(Penerbit::class);
    }

    public function genre()
    {
        return $this->belongsTo(Genre::class);
    }
}
