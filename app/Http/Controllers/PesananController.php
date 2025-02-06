<?php

namespace App\Http\Controllers;

use App\Models\Pembayaran;
use Inertia\Inertia;
use App\Models\Pesanan;
use Illuminate\Http\Request;

class PesananController extends Controller
{
    public function index()
    {
        $orders = Pesanan::all();
        return Inertia::render('Pesanan', [
            'orders' => $orders
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_pelanggan' => 'required|integer|max_digits:10',
            'id_buku' => 'required|integer|max_digits:10',
            'jumlah_pesanan' => 'required|integer|max_digits:5',
            'tanggal_pesanan' => 'required|date|max_digits:10',
        ]);

        Pesanan::create($validated);

        return redirect()->noContent();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_pelanggan' => 'required|integer|max_digits:10',
            'id_buku' => 'required|integer|max_digits:10',
            'jumlah_pesanan' => 'required|integer|max_digits:5',
            'tanggal_pesanan' => 'required|date|max_digits:10',
        ]);

        $Pesanan = Pesanan::findOrFaill($id);
        $Pesanan->update($validated);

        return redirect()->noContent();
    }

    public function destroy($id)
    {
        $hasRelation = Pembayaran::where('id_pesanan', $id)->exists();

        if ($hasRelation) {
            return redirect()->route('pesanan.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        Pesanan::findOrFail($id)->delete();
        return redirect()->noContent();
    }
}
