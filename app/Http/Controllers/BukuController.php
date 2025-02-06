<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Inertia\Inertia;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class BukuController extends Controller
{
    public function index()
    {
        $books = Buku::all();
        return Inertia::render('Dashboard', [
            'books' => $books
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'id_penuls' => 'sometimes|required|integer|max_digits:10',
            'isbn' => 'nullable|string|max:13',
            'id_penerbit' => 'sometimes|required|integer|max_digits:10',
            'tahun_terbit' => 'sometimes|required|dateTime',
            'id_genre' => 'sometimes|required|integer|max_digits:10',
            'harga' => 'sometimes|required|integer',
            'stok' => 'sometimes|required|integer|max_digits:5'
        ]);

        Buku::create($validated);

        return redirect()->noContent();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'judul' => 'sometimes|required|string|max:255',
            'id_penuls' => 'sometimes|required|integer|max_digits:10',
            'isbn' => 'nullable|string|max:13',
            'id_penerbit' => 'sometimes|required|integer|max_digits:10',
            'tahun_terbit' => 'sometimes|required|dateTime',
            'id_genre' => 'sometimes|required|integer|max_digits:10',
            'harga' => 'sometimes|required|integer',
            'stok' => 'sometimes|required|integer|max_digits:5'
        ]);

        $book = Buku::findOrFaill($id);
        $book->update($validated);

        return redirect()->noContent();
    }

    public function destroy($id)
    {
        $hasRelation = Pesanan::where('id_buku', $id)->exists();

        if ($hasRelation) {
            return redirect()->route('buku.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        Buku::findOrFail($id)->delete();
        return redirect()->noContent();
    }
}
