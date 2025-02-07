<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pembayaran;
use App\Models\Pengiriman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PembayaranController extends Controller
{
    public function index()
    {
        $payments = Pembayaran::all();
        return Inertia::render('Crud/Pembayaran', [
            'publishers' => $payments
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_pesanan' => 'required|integer|max_digits:10',
            'tanggal_pembayaran' => 'required|date',
            'total_pembayaran' => 'required|integer',
            'stat_pembayaran' => 'required|string|max:255',
        ]);

        Pembayaran::create($validated);

        return redirect()->route('pembayaran.index')->with('message', 'Data berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_pesanan' => 'required|integer|max_digits:10',
            'tanggal_pembayaran' => 'required|date',
            'total_pembayaran' => 'required|integer',
            'stat_pembayaran' => 'required|string|max:255',
        ]);

        $pembayaran = DB::table('pembayaran')
            ->where('id_pembayaran', $id)
            ->update($validated);
        if (!$pembayaran) {
            return redirect()->route('pembayaran.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('pembayaran.index')->with('message', 'Data berhasil diubah!');
    }

    public function destroy($id)
    {
        $hasRelation = DB::table('pengiriman')
            ->where('id_pembayaran', $id)
            ->exists();

        if ($hasRelation) {
            return redirect()->route('pengiriman.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        $pembayaran = Pembayaran::where('id_pembayaran', $id)->delete();
        if (!$pembayaran) {
            return redirect()->route('pembayaran.index')->withErrors('message', 'Data tidak ditemukan.');
        }

        return redirect()->route('pembayaran.index')->with('message', 'Data berhasil idhapus!');
    }
}
