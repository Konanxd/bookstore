<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\PesananBuku;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PesananBukuController extends Controller
{
    public function index()
    {
        $orders = PesananBuku::select(
            'pesanan_buku.*',
            'buku.judul as judul',
            'pelanggan.nama_pelanggan as nama_pelanggan',
            'pesanan.tanggal_pesanan as tanggal_pesanan',
        )
            ->leftJoin('pesanan', 'pesanan_buku.id_pesanan', '=', 'pesanan.id_pesanan')
            ->leftJoin('buku', 'pesanan_buku.id_buku', '=', 'buku.id_buku')
            ->leftJoin('pelanggan', 'pesanan.id_pelanggan', '=', 'pelanggan.id_pelanggan')
            ->get();
        return Inertia::render('Crud/PesananBuku', [
            'book_orders' => $orders
        ]);
    }

    // public function store(Request $request)
    // {
    //     $validated = $request->validate([
    //         'id_pesanan' => 'required|integer|max_digits:10',
    //         'id_buku' => 'required|integer|max_digits:10',
    //         'jumlah_pesanan' => 'required|integer|max_digits:5',
    //         'tanggal_pesanan' => 'required|date|max_digits:10',
    //     ]);

    //     PesananBuku::create($validated);

    //     return redirect()->route('pesanan.index')->with('message', 'Data berhasil ditambahkan!');
    // }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_pesanan' => 'required|integer|max_digits:10',
            'id_buku' => 'required|integer|max_digits:10',
            'jumlah_pesanan' => 'required|integer|max_digits:5',
        ]);

        $pesanan = DB::table('pesanan_buku')
            ->where('id_pesanan', $id)
            ->update($validated);
        if (!$pesanan) {
            return redirect()->route('pesanan_buku.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('pesanan_buku.index')->with('message', 'Data berhasil diubah!');
    }

    public function destroy($id)
    {
        $pesanan = PesananBuku::where('id_pesanan', $id)->delete();
        if (!$pesanan) {
            return redirect()->route('pesanan.index')->withErrors('message', 'Data tidak ditemukan.');
        }

        return redirect()->route('pesanan_buku.index')->with('message', 'Data berhasil dihapus!');
    }
}
