<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $genreDistribution = DB::table('buku')
            ->join('genre', 'buku.id_genre', '=', 'genre.id_genre')
            ->select('genre.nama_genre as Genre', DB::raw('COUNT(*) as Total'))
            ->groupBy('genre.nama_genre')
            ->orderBy('Total', 'desc')
            ->limit(5)
            ->get();

        $bookStockLevels = DB::table('buku')
            ->select('judul as book', 'stok as stock')
            ->where('stok', "<", '12')
            ->orderBy('stok')
            ->get();

        $salesOverTime = DB::table('pesanan')
            ->select(DB::raw('DATE_FORMAT(tanggal_pesanan, "%Y-%m") as month'), DB::raw('SUM(jumlah_pesanan) as total_sold'))
            ->whereYear('tanggal_pesanan', 2024)
            ->groupBy('month')
            ->orderBy('month', 'ASC')
            ->get();

        return Inertia::render('Dashboard', [
            'genreDistribution' => $genreDistribution,
            'bookStockLevels' => $bookStockLevels,
            'salesOverTime' => $salesOverTime
        ]);
    }
}
