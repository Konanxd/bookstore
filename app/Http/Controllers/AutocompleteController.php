<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Genre;
use App\Models\Pelanggan;
use App\Models\Penerbit;
use App\Models\Penulis;
use Illuminate\Http\Request;

class AutocompleteController extends Controller
{
    public function genre(Request $request)
    {
        $search = $request->query('q');

        return response()->json(
            Genre::where('nama_genre', 'like', "%{$search}%")
                ->limit(10)
                ->get(['id_genre as id', 'nama_genre as nama'])
        );
    }

    public function genreNama(Request $request)
    {
        $search = $request->query('q');

        return response()->json(
            Genre::where('id_genre', '=', "{$search}")
                ->limit(10)
                ->pluck('nama_genre')
        );
    }


    public function penulis(Request $request)
    {
        $search = $request->query('q');

        return response()->json(
            Penulis::where('nama_penulis', 'like', "%{$search}%")
                ->limit(10)
                ->get(['id_penulis as id', 'nama_penulis as nama'])
        );
    }

    public function penulisNama(Request $request)
    {
        $search = $request->query('q');

        return response()->json(
            Penulis::where('id_penulis', '=', "{$search}")
                ->limit(10)
                ->pluck('nama_penulis')
        );
    }

    public function penerbit(Request $request)
    {
        $search = $request->query('q');

        return response()->json(
            Penerbit::where('nama_penerbit', 'like', "%{$search}%")
                ->limit(10)
                ->get(['id_penerbit as id', 'nama_penerbit as nama'])
        );
    }

    public function penerbitNama(Request $request)
    {
        $search = $request->query('q');

        return response()->json(
            Penerbit::where('id_penerbit', '=', "{$search}")
                ->limit(10)
                ->pluck('nama_penerbit')
        );
    }

    public function pelanggan(Request $request)
    {
        $search = $request->query('q');

        return response()->json(
            Pelanggan::where('nama_pelanggan', 'like', "%{$search}%")
                ->limit(10)
                ->get(['id_pelanggan as id', 'nama_pelanggan as nama'])
        );
    }

    public function buku(Request $request)
    {
        $search = $request->query('q');

        return response()->json(
            Buku::where('judul', 'like', "%{$search}%")
                ->limit(10)
                ->get(['id_buku as id', 'judul as judul'])
        );
    }
}
