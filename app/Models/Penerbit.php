<?php

namespace App\Models;

use App\Models\Buku;
use Illuminate\Database\Eloquent\Model;

class Penerbit extends Model
{
    protected $table = "penerbit";
    protected $fillable = ["nama_penerbit"];

    public function buku()
    {
        return $this->hasOne(Buku::class);
    }
}
