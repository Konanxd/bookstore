<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Inertia\Inertia;
use App\Models\Penulis;
use Illuminate\Http\Request;

class PenulisController extends Controller
{
    public function index()
    {
        $authors = Penulis::all();
        return Inertia::render('Penulis', [
            'authors' => $authors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_penulis' => 'sometimes|required|string|max:255'
        ]);

        Penulis::create($validated);

        return redirect()->noContent();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_penulis' => 'sometimes|required|string|max:255'
        ]);

        $penulis = Penulis::findOrFaill($id);
        $penulis->update($validated);

        return redirect()->noContent();
    }

    public function destroy($id)
    {
        $hasRelation = Buku::where('id_penulis', $id)->exists();

        if ($hasRelation) {
            return redirect()->route('penulis.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        Penulis::findOrFail($id)->delete();
        return redirect()->noContent();
    }
}
