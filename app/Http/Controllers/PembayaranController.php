<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pembayaran;
use App\Models\Pengiriman;
use Illuminate\Http\Request;

class PembayaranController extends Controller
{
    public function index(Pembayaran $payment)
    {
        $payments = Pembayaran::all();
        return Inertia::render('Pembayaran', [
            'publishers' => $payment
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_pesanan' => 'required|integer|max_digits:10',
            'tanggal_pembayaran' => 'required|date',
            'total_pembayaran' => 'required|integer',
            'stat_bayar' => 'required|string|max:255',
        ]);

        Pembayaran::create($validated);

        return redirect()->noContent();
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_pesanan' => 'required|integer|max_digits:10',
            'tanggal_pembayaran' => 'required|date',
            'total_pembayaran' => 'required|integer',
            'stat_bayar' => 'required|string|max:255',
        ]);

        $peenrbit = Pembayaran::findOrFaill($id);
        $peenrbit->update($validated);

        return redirect()->noContent();
    }

    public function destroy($id)
    {
        $hasRelation = Pengiriman::where('id_pengiriman', $id)->exists();

        if ($hasRelation) {
            return redirect()->route('pengiriman.index')->withErrors([
                'message' => 'Data ini tidak bisa dihapus karena id masih tersedia di tabel lain.'
            ]);
        }

        Pembayaran::findOrFail($id)->delete();
        return redirect()->noContent();
    }
}
