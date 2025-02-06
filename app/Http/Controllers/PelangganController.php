<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pelanggan;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class PelangganController extends Controller
{
    public function index()
    {
        $customers = Pelanggan::all();
        return Inertia::render('Pelanggan', [
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

        return redirect()->noContent();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            "nama_pelanggan" => 'required|string|max:255',
            "no_hp" => 'required|string|max:13',
            "alamat_pelanggan" => 'required|string|max:255',
        ]);

        $pelanggan = Pelanggan::findOrFaill($id);
        $pelanggan->update($validated);

        return redirect()->noContent();
    }

    public function destroy($id)
    {
        $hasRelation = Pesanan::where('id_pelanggan', $id)->exists();

        if ($hasRelation) {
            return redirect()->route('pelanggan.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        Pelanggan::findOrFail($id)->delete();
        return redirect()->noContent();
    }
}
