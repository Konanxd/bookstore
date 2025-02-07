<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pesanan;
use App\Models\Pelanggan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PelangganController extends Controller
{
    public function index()
    {
        $customers = Pelanggan::all();
        return Inertia::render('Crud/Pelanggan', [
            'customers' => $customers
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "nama_pelanggan" => 'required|string|max:255',
            "no_hp" => 'required|string|max:13',
            "alamat_pelanggan" => 'required|string|max:255',
        ]);

        Pelanggan::create($validated);

        return redirect()->route('pelanggan.index')->with('message', 'Data berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            "nama_pelanggan" => 'required|string|max:255',
            "no_hp" => 'required|string|max:13',
            "alamat_pelanggan" => 'required|string|max:255',
        ]);

        $pelanggan = DB::table('pelanggan')
            ->where('pelanggan', $id)
            ->update($validated);
        if (!$pelanggan) {
            return redirect()->route('pelanggan.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('pelanggan.index')->with('message', 'Data berhasil diubah');
    }

    public function destroy($id)
    {
        $hasRelation = DB::table('pesanan')
            ->where('id_pelanggan', $id)
            ->exists();

        // dd($hasRelation);

        if ($hasRelation) {
            return redirect()->route('pelanggan.index')->withErrors('message', 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.');
        }

        $pelanggan = Pelanggan::where('id_pelanggan', $id)->delete();
        if (!$pelanggan) {
            return redirect()->route('pelanggan.index')->withErrors('message', 'Data tidak ditemukan.');
        }

        return redirect()->route('pelanggan.index')->with('message', 'Data berhasil idhapus!');
    }
}
