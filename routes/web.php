<?php

use App\Http\Controllers\BukuController;
use App\Http\Controllers\ProfileController;
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

Route::get(
    '/',
    [BukuController::class, 'index']
)->name('buku.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
});

Route::get('/pelanggan', function () {
    return Inertia::render('Crud/Pelanggan');
});

Route::get('/genre', function () {
    return Inertia::render('Crud/Genre');
});

Route::get('/penerbit', function () {
    return Inertia::render('Crud/Penerbit');
});

Route::get('/penulis', function () {
    return Inertia::render('Crud/Penulis');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';