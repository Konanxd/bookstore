<?php

namespace App\Http\Controllers;

use App\Models\Buku;
use App\Models\Pembayaran;
use Inertia\Inertia;
use App\Models\Pesanan;
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

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_buku' => 'required|integer|max_digits:10',
            'jumlah_pesanan' => 'required|integer|max_digits:5',
        ]);

        $oldOrder = PesananBuku::where('id_pesanan', $id)->first();

        if (!$oldOrder) {
            return redirect()->route('pesanan_buku.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        $oldBookId = $oldOrder->id_buku;
        $oldQuantity = $oldOrder->jumlah_pesanan;
        $newBookId = $validated['id_buku'];
        $newQuantity = $validated['jumlah_pesanan'];

        DB::beginTransaction();
        try {
            // If the book is changed
            if ($oldBookId !== $newBookId) {
                // Restore stock for the old book
                Buku::where('id_buku', $oldBookId)->increment('stok', $oldQuantity);
                // Reduce stock for the new book
                Buku::where('id_buku', $newBookId)->decrement('stok', $newQuantity);
            } else {
                // If only quantity is changed
                if ($newQuantity > $oldQuantity) {
                    $difference = $newQuantity - $oldQuantity;
                    Buku::where('id_buku', $newBookId)->decrement('stok', $difference);
                } elseif ($newQuantity < $oldQuantity) {
                    $difference = $oldQuantity - $newQuantity;
                    Buku::where('id_buku', $newBookId)->increment('stok', $difference);
                }
            }

            // Update the order
            PesananBuku::where('id_pesanan', $id)->update($validated);

            DB::commit();
            return redirect()->route('pesanan_buku.index')->with('message', 'Data berhasil diubah!');
        } catch (\Exception $e) {
            DB::rollBack();
            return redirect()->route('pesanan_buku.index')->withErrors([
                'message' => 'Terjadi kesalahan saat mengupdate data.'
            ]);
        }
    }


    public function destroy($id)
    {
        $pesananBuku = Pembayaran::where('id_pesanan', $id)->exists();
        if ($pesananBuku) {
            return redirect()->route('pesanan_buku.index')->withErrors('message', 'Data tidak ditemukan.');
        }

        $orderedBooks = PesananBuku::where('id_pesanan', $id)
            ->select('id_buku', 'jumlah_pesanan')
            ->get();

        foreach ($orderedBooks as $book) {
            Buku::where('id_buku', $book->id_buku)
                ->increment('stok', $book->jumlah_pesanan);
        }

        PesananBuku::where('id_pesanan', $id)->delete();
        Pesanan::where('id_pesanan', $id)->delete();

        return redirect()->route('pesanan_buku.index')->with('message', 'Data berhasil dihapus!');
    }
}
