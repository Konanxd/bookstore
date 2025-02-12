<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $genreDistribution = DB::table('pesanan_buku')
            ->join('buku', 'buku.id_buku', '=', 'pesanan_buku.id_buku')
            ->join('genre', 'buku.id_genre', '=', 'genre.id_genre')
            ->select('genre.nama_genre as Genre', DB::raw('SUM(pesanan_buku.jumlah_pesanan) as Total'))
            ->groupBy('genre.nama_genre')
            ->orderBy('Total', 'desc')
            ->get();

        $bookStockLevels = DB::table('buku')
            ->select('judul as book', 'stok as stock')
            ->where('stok', "<", '12')
            ->orderBy('stok')
            ->get();

        $salesOverTime = DB::table('pesanan')
            ->join('pembayaran', 'pembayaran.id_pesanan', '=', 'pesanan.id_pesanan')
            ->select(
                DB::raw('MONTHNAME(pesanan.tanggal_pesanan) as month'),
                DB::raw('MONTH(pesanan.tanggal_pesanan) as month_number'),
                DB::raw('SUM(pembayaran.total_pembayaran) as total_sold')
            )
            ->whereYear('pesanan.tanggal_pesanan', 2024)
            ->groupBy('month', 'month_number')
            ->orderBy('month_number')
            ->get();

        $topSellingBooks = DB::table('pesanan_buku')
            ->join('buku', 'buku.id_buku', '=', 'pesanan_buku.id_buku')
            ->select('buku.judul', DB::raw('SUM(pesanan_buku.jumlah_pesanan) as total_sold'))
            ->groupBy('buku.judul')
            ->orderBy('total_sold', 'desc')
            ->limit(10)
            ->get();

        return Inertia::render('Dashboard', [
            'genreDistribution' => $genreDistribution,
            'bookStockLevels' => $bookStockLevels,
            'salesOverTime' => $salesOverTime,
            'topSellingBooks' => $topSellingBooks
        ]);
    }
}
