<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Inertia\Inertia;
use App\Models\Genre;
use App\Models\Penulis;
use App\Models\Pesanan;
use App\Models\Penerbit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BukuController extends Controller
{
    public function index()
    {
        $books = Buku::select(
            'buku.*',
            'penulis.nama_penulis as nama_penulis',
            'penerbit.nama_penerbit as nama_penerbit',
            'genre.nama_genre as nama_genre'
        )
            ->leftJoin('penulis', 'buku.id_penulis', '=', 'penulis.id_penulis')
            ->leftJoin('penerbit', 'buku.id_penerbit', '=', 'penerbit.id_penerbit')
            ->leftJoin('genre', 'buku.id_genre', '=', 'genre.id_genre')
            ->get();

        return Inertia::render('Crud/Buku', [
            'books' => $books
        ]);
    }


    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'id_penulis' => 'sometimes|required|integer|max_digits:10',
            'isbn' => 'nullable|string|max:13',
            'id_penerbit' => 'sometimes|required|integer|max_digits:10',
            'tahun_terbit' => 'sometimes|required|date',
            'id_genre' => 'sometimes|required|integer|max_digits:10',
            'harga' => 'sometimes|required|integer',
            'stok' => 'sometimes|required|integer|max_digits:5'
        ]);

        Buku::create($validated);

        return redirect()->route('buku.index')->with(['message' => 'Data berhasil ditambahkan!'], 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'id_penuls' => 'sometimes|required|integer|max_digits:10',
            'isbn' => 'nullable|string|max:13',
            'id_penerbit' => 'sometimes|required|integer|max_digits:10',
            'tahun_terbit' => 'sometimes|required|string',
            'id_genre' => 'sometimes|required|integer|max_digits:10',
            'harga' => 'sometimes|required|integer',
            'stok' => 'sometimes|required|integer|max_digits:5'
        ]);

        $buku = DB::table('buku')
            ->where('id_buku', $id)
            ->update($validated);
        if (!$buku) {
            return redirect()->route('buku.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('buku.index')->with('message', 'Data berhasil diubah!');
    }

    public function destroy($id)
    {
        $hasRelation = DB::table('pesanan')
            ->where('id_buku', $id)
            ->exists();

        // dd($hasRelation);

        if ($hasRelation) {
            return redirect()->route('buku.index')->withErrors('message', 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.');
        }

        $buku = Buku::where('id_buku', $id)->delete();
        if (!$buku) {
            return redirect()->route('buku.index')->withErrors('message', 'Data tidak ditemukan.');
        }

        return redirect()->route('buku.index')->with('message', 'Data berhasil dihapus!');
    }
}
