<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Inertia\Inertia;
use App\Models\Penerbit;
use Illuminate\Http\Request;

class PenerbitController extends Controller
{
    public function index()
    {
        $publishers = Penerbit::all();
        return Inertia::render('Penerbit', [
            'publishers' => $publishers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_penerbit' => 'sometimes|required|string|max:255'
        ]);

        Penerbit::create($validated);

        return redirect()->noContent();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_penerbit' => 'sometimes|required|string|max:255'
        ]);

        $peenrbit = Penerbit::findOrFaill($id);
        $peenrbit->update($validated);

        return redirect()->noContent();
    }

    public function destroy($id)
    {
        $hasRelation = Buku::where('id_penerbit', $id)->exists();

        if ($hasRelation) {
            return redirect()->route('penerbit.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        Penerbit::findOrFail($id)->delete();
        return redirect()->noContent();
    }
}
