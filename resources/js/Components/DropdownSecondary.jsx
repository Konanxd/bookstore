import { useState } from 'react';

export default function DropdownSecondary() {
    const [dashboardOpen, setDashboardOpen] = useState(false);
    const [dataOpen, setDataOpen] = useState(false);
    const [orderOpen, setOrderOpen] = useState(false);

    return (
        <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-2">
                {/* Tombol Dropdown */}
                <button
                    onClick={() => setDashboardOpen(!dashboardOpen)}
                    className="items-st pd flex flex-col gap-2 text-black"
                >
                    <div className="text-sm font-semibold capitalize">
                        <span>Dashboard</span>
                    </div>
                </button>
                {/* Daftar Opsi */}
                {dashboardOpen && (
                    <div className="ml-2 flex flex-col gap-0.5 text-sm text-slate-500">
                        <a
                            href="/dashboard"
                            className="capitalize hover:text-slate-800"
                        >
                            Dashboard
                        </a>
                        <a
                            href="/analytics"
                            className="capitalize hover:text-slate-800"
                        >
                            Analytics
                        </a>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                {/* Tombol Dropdown */}
                <button
                    onClick={() => setDataOpen(!dataOpen)}
                    className="items-st pd flex flex-col gap-2 text-black"
                >
                    <div className="Capitalize text-sm font-semibold">
                        <span>Data Management</span>
                    </div>
                </button>
                {/* Daftar Opsi */}
                {dataOpen && (
                    <div className="ml-2 flex flex-col gap-0.5 text-sm text-slate-500">
                        <a
                            href="/pelanggan"
                            className="capitalize hover:text-slate-800"
                        >
                            pelanggan
                        </a>
                        <a
                            href="/buku"
                            className="capitalize hover:text-slate-800"
                        >
                            buku
                        </a>
                        <a
                            href="/genre"
                            className="capitalize hover:text-slate-800"
                        >
                            genre
                        </a>
                        <a
                            href="/penerbit"
                            className="capitalize hover:text-slate-800"
                        >
                            penerbit
                        </a>
                        <a
                            href="/penulis"
                            className="capitalize hover:text-slate-800"
                        >
                            penulis
                        </a>
                    </div>
                )}
            </div>
            <div className="flex flex-col gap-2">
                {/* Tombol Dropdown */}
                <button
                    onClick={() => setOrderOpen(!orderOpen)}
                    className="items-st pd flex flex-col gap-2 text-black"
                >
                    <div className="Capitalize text-sm font-semibold">
                        <span>Order Management</span>
                    </div>
                </button>
                {/* Daftar Opsi */}
                {orderOpen && (
                    <div className="ml-2 flex flex-col gap-0.5 text-sm text-slate-500">
                        <a
                            href="/pesanan"
                            className="capitalize hover:text-slate-800"
                        >
                            pesanan
                        </a>
                        <a
                            href="/pengiriman"
                            className="capitalize hover:text-slate-800"
                        >
                            pengiriman
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}
