<?php

use App\Http\Controllers\BukuController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\PelangganController;
use App\Http\Controllers\PembayaranController;
use App\Http\Controllers\PenerbitController;
use App\Http\Controllers\PengirimanController;
use App\Http\Controllers\PenulisController;
use App\Http\Controllers\PesananController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AutocompleteController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// });

// Route::get(
//     '/',
//     [BukuController::class, 'index']
// )->name('buku.index');


Route::get('/api/autocomplete/genre', [AutocompleteController::class, 'genre']);
Route::get('/api/autocomplete/genre_nama', [AutocompleteController::class, 'genreNama']);
Route::get('/api/autocomplete/penulis', [AutocompleteController::class, 'penulis']);
Route::get('/api/autocomplete/penulis_nama', [AutocompleteController::class, 'penulisNama']);
Route::get('/api/autocomplete/penerbit', [AutocompleteController::class, 'penerbit']);
Route::get('/api/autocomplete/penerbit_nama', [AutocompleteController::class, 'penerbitNama']);

Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

Route::get('/buku', [BukuController::class, 'index'])->name('buku.index');
Route::post('/buku', [BukuController::class, 'store'])->name('buku.store');
Route::put('/buku/{id}', [BukuController::class, 'update'])->name('buku.update');
Route::delete('/buku/{id}', [BukuController::class, 'destroy'])->name('buku.destroy');

Route::get('/pelanggan', [PelangganController::class, 'index'])->name('pelanggan.index');
Route::post('/pelanggan', [PelangganController::class, 'store'])->name('pelanggan.store');
Route::put('/pelanggan/{id}', [PelangganController::class, 'update'])->name('pelanggan.update');
Route::delete('/pelanggan/{id}', [PelangganController::class, 'destroy'])->name('pelanggan.destroy');

Route::get('/penerbit', [PenerbitController::class, 'index'])->name('penerbit.index');
Route::post('/penerbit', [PenerbitController::class, 'store'])->name('penerbit.store');
Route::put('/penerbit/{id}', [PenerbitController::class, 'update'])->name('penerbit.update');
Route::delete('/penerbit/{id}', [PenerbitController::class, 'destroy'])->name('penerbit.destroy');

Route::get('/penulis', [PenulisController::class, 'index'])->name('penulis.index');
Route::post('/penulis', [PenulisController::class, 'store'])->name('penulis.store');
Route::put('/penulis/{id}', [PenulisController::class, 'update'])->name('penulis.update');
Route::delete('/penulis/{id}', [PenulisController::class, 'destroy'])->name('penulis.destroy');

Route::get('/genre', [GenreController::class, 'index'])->name('genre.index');
Route::post('/genre', [GenreController::class, 'store'])->name('genre.store');
Route::put('/genre/{id}', [GenreController::class, 'update'])->name('genre.update');
Route::delete('/genre/{id}', [GenreController::class, 'destroy'])->name('genre.destroy');

Route::get('/pesanan', [PesananController::class, 'index'])->name('pesanan.index');
Route::post('/pesanan', [PesananController::class, 'store'])->name('pesanan.store');
Route::put('/pesanan/{id}', [PesananController::class, 'update'])->name('pesanan.update');
Route::delete('/pesanan/{id}', [PesananController::class, 'destroy'])->name('pesanan.destroy');

Route::get('/pembayaran', [PembayaranController::class, 'index'])->name('pembayaran.index');
Route::post('/pembayaran', [PembayaranController::class, 'store'])->name('pembayaran.store');
Route::put('/pembayaran/{id}', [PembayaranController::class, 'update'])->name('pembayaran.update');
Route::delete('/pembayaran/{id}', [PembayaranController::class, 'destroy'])->name('pembayaran.destroy');

Route::get('/pengiriman', [PengirimanController::class, 'index'])->name('pengiriman.index');
Route::post('/pengiriman', [PengirimanController::class, 'store'])->name('pengiriman.store');
Route::put('/pengiriman/{id}', [PengirimanController::class, 'update'])->name('pengiriman.update');
Route::delete('/pengiriman/{id}', [PengirimanController::class, 'destroy'])->name('pengiriman.destroy');


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
