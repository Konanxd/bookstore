<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Pengiriman;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PengirimanController extends Controller
{
    public function index()
    {
        $shipments = Pengiriman::all();
        return Inertia::render('Pengiriman', [
            'shipments' => $shipments
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'id_pembayaran' => 'required|integer|max_digits:13',
            'id_pesanan' => 'required|integer|max_digits:13',
            'tanggal_pengiriman' => 'required|string|',
            'status_pengiriman' => 'required|string|max:255',
            'no_resi' => 'required|string|max:255'
        ]);

        Pengiriman::create($validated);

        return redirect()->route('pengiriman.index')->with('message', 'Data berhasil ditambahkan!');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'id_pembayaran' => 'required|integer|max_digits:13',
            'id_pesanan' => 'required|integer|max_digits:13',
            'tanggal_pengiriman' => 'required|string|',
            'status_pengiriman' => 'required|string|max:255',
            'no_resi' => 'required|string|max:255'
        ]);

        $pengiriman = DB::table('pengiriman')
            ->where('id_pengiriman', $id)
            ->update($validated);
        if (!$pengiriman) {
            return redirect()->route('pengiriman.index')->withErrors([
                'message' => 'Data tidak ditemukan.'
            ]);
        }

        return redirect()->route('pengiriman.index')->with('message', 'Data berhasil ditambahkan!');
    }

    public function destroy($id)
    {
        Pengiriman::findOrFail($id)->delete();
        return redirect()->route('pengiriman.index')->with('message', 'Data berhasil ditambahkan!');
    }
}
