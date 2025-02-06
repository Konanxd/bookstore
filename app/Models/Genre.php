<?php

namespace App\Models;

use App\Models\Buku;
use Illuminate\Database\Eloquent\Model;

class Genre extends Model
{
    protected $table = "genre";
    protected $fillable = ["nama_genre"];

    public function buku()
    {
        return $this->hasOne(Buku::class);
    }
}
