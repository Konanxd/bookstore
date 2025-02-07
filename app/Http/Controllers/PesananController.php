<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pesanan;
use App\Models\Pembayaran;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

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

        return redirect()->route('pesanan.index')->with('message', 'Data berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_pelanggan' => 'required|integer|max_digits:10',
            'id_buku' => 'required|integer|max_digits:10',
            'jumlah_pesanan' => 'required|integer|max_digits:5',
            'tanggal_pesanan' => 'required|date|max_digits:10',
        ]);

        $pesanan = DB::table('pesanan')
            ->where('id_pesanan', $id)
            ->update($validated);
        if (!$pesanan) {
            return redirect()->route('pesanan.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('pesanan.index')->with('message', 'Data berhasil diubah!');
    }

    public function destroy($id)
    {
        $hasRelation = DB::table('pembayaran')
            ->where('id_pesanan', $id)
            ->exists();

        if ($hasRelation) {
            return redirect()->route('pesanan.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        $pesanan = Pesanan::where('id_pesanan', $id)->delete();
        if (!$pesanan) {
            return redirect()->route('pesanan.index')->withErrors('message', 'Data tidak ditemukan.');
        }

        return redirect()->route('pesanan.index')->with('message', 'Data berhasil dihapus!');
    }
}
