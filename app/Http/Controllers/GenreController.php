<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Inertia\Inertia;
use App\Models\Genre;
use Illuminate\Http\Request;

class GenreController extends Controller
{
    public function index()
    {
        $genres = Genre::all();
        return Inertia::render('Genre', [
            'genres' => $genres
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_genre' => 'sometimes|required|string|max:50'
        ]);

        Genre::create($validated);

        return redirect()->noContent();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_genre' => 'sometimes|required|string|max:50'
        ]);

        $genre = Genre::findOrFaill($id);
        $genre->update($validated);

        return redirect()->noContent();
    }

    public function destroy($id)
    {
        $hasRelation = Buku::where('id_genre', $id)->exists();

        if ($hasRelation) {
            return redirect()->route('genre.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        Genre::findOrFail($id)->delete();
        return redirect()->noContent();
    }
}
