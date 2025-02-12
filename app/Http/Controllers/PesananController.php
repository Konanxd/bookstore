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
        $orders = Pesanan::select(
            'pesanan.*',
            'pelanggan.nama_pelanggan as nama_pelanggan',
        )
            ->leftJoin('pelanggan', 'pesanan.id_pelanggan', '=', 'pelanggan.id_pelanggan')
            ->get();
        return Inertia::render('Crud/Pesanan', [
            'orders' => $orders
        ]);
    }

    public function update(Request $request, $id)
    {

        $validated = $request->validate([
            'id_pelanggan' => 'required|integer|max_digits:10',
            'tanggal_pesanan' => 'required|date',
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
