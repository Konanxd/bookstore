<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use Inertia\Inertia;
use App\Models\Penerbit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        return redirect()->route('penerbit.index')->with('message', 'Data berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'nama_penerbit' => 'sometimes|required|string|max:255'
        ]);

        $penerbit = DB::table('penerbit')
            ->where('id_penerbit', $id)
            ->update($validated);
        if (!$penerbit) {
            return redirect()->route('penerbit.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('penerbit.index')->with('message', 'Data berhasil diubah!');
    }

    public function destroy($id)
    {
        $hasRelation = DB::table('buku')
            ->where('id_penerbit', $id)
            ->exists();

        if ($hasRelation) {
            return redirect()->route('penerbit.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        $penerbit = Penerbit::where('id_penerbit', $id)->delete();
        if (!$penerbit) {
            return redirect()->route('penerbit.index')->withErrors('message', 'Data tidak ditemukan.');
        }

        return redirect()->route('penerbit.index')->with('message', 'Data berhasil dihapus!');
    }
}
