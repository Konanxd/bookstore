<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Penulis;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PenulisController extends Controller
{
    public function index()
    {
        $authors = Penulis::all();
        return Inertia::render('Crud/Penulis', [
            'authors' => $authors
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nama_penulis' => 'sometimes|required|string|max:255'
        ]);

        Penulis::create($validated);

        return redirect()->route('penulis.index')->with('message', 'Data berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_penulis' => 'sometimes|required|string|max:255'
        ]);

        $penulis = DB::table('penulis')
            ->where('id_penulis', $id)
            ->update($validated);
        if (!$penulis) {
            return redirect()->route('penulis.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('penulis.index')->with('message', 'Data berhasil diubah!');
    }

    public function destroy($id)
    {
        $hasRelation = DB::table('buku')
            ->where('id_penulis', $id)
            ->exists();

        if ($hasRelation) {
            return redirect()->route('penulis.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        $penulis = Penulis::where('id_penulis', $id)->delete();
        if (!$penulis) {
            return redirect()->route('penulis.index')->withErrors('message', 'Data tidak ditemukan.');
        }
        return redirect()->route('penulis.index')->with('message', 'Data berhasil ditambahkan!');
    }
}
