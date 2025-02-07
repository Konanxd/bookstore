<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Inertia\Inertia;
use App\Models\Genre;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::all();
        return Inertia::render('Crud/Genre', [
            'genres' => $genres
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_genre' => 'sometimes|required|string|max:50'
        ]);

        Genre::create($validated);

        return redirect()->route('genre.index')->with('message', 'Data berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_genre' => 'sometimes|required|string|max:50'
        ]);

        $genre = DB::table('genre')
            ->where('id_genre', $id)
            ->update($validated);
        if (!$genre) {
            return redirect()->route('genre.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('genre.index')->with('message', 'Data berhasil diubah!');
    }

    public function destroy($id)
    {
        $hasRelation = DB::table('buku')
            ->where('id_genre', $id)
            ->exists();

        if ($hasRelation) {
            return redirect()->route('genre.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        $genre = Genre::where('id_genre', $id)->delete();
        if (!$genre) {
            return redirect()->route('genre.index')->withErrors('message', 'Data tidak ditemukan.');
        }

        return redirect()->route('genre.index')->with('message', 'Data berhasil ditambahkan!');
    }
}
