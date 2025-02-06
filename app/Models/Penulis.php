<?php

namespace App\Models;

use App\Models\Buku;
use Illuminate\Database\Eloquent\Model;

class Penulis extends Model
{
    protected $table = "penulis";
    protected $fillable = ["nama_penulis"];

    public function buku()
    {
        return $this->hasOne(Buku::class);
    }
}
