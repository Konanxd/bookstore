import { useState } from "react";
import CrudHead from "../CrudHead";
import FormPesananBuku from "../Form/FormPesananBuku";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";
import { router } from "@inertiajs/react";

const tableHeaders = [
    "ID pesanan",
    "Judul Buku",
    "Nama pelanggan",
    "Jumlah Pesanan",
    "Tanggal Pesanan",
    "Aksi",
];

const tableFields = [
    "id_pesanan",
    "judul",
    "nama_pelanggan",
    "jumlah_pesanan",
    "tanggal_pesanan",
];

const commonCellClass = "py-5 relative";
const commonHeaderClass = "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3";

export default function TablePesanan({ orders }) {
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm("Anda yakin ingin menghapus data ini?")) {
            router.delete(`/pesanan_buku/${id}`, {
                onSuccess: () => {
                    alert("Pesanan berhasil dihapus!");
                },
                onError: () => {
                    alert(
                        "Terjadi kesalahan atau pesanan masih tersedia di tabel lain."
                    );
                },
            });
        }
    };

    const handleUpdate = (updatedData) => {
        router.put(`/pesanan_buku/${selectedItem.id_pesanan}`, updatedData, {
            onSuccess: () => {
                alert("Pesanan berhasil diubah!");
                setEditOpen(false);
                setSelectedItem(null);
            },
            onError: () => {
                alert("Terjadi kesalahan saat mengubah pesanan.");
            },
        });
    };

    const Orders = orders.filter((order) =>
        order.nama_pelanggan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead
                title="Pesanan Buku"
                onClick={() => setTambahOpen(!TambahOpen)}
            >
                <input
                    type="text"
                    placeholder="Cari nama pelanggan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
            </CrudHead>
            {/* {TambahOpen && (
                <FormPesanan
                    onSubmit={handleAddItem}
                    onCancel={() => setTambahOpen(false)}
                />
            )} */}

            {EditOpen && selectedItem && (
                <FormPesananBuku
                    data={selectedItem}
                    onSubmit={handleUpdate}
                    onCancel={() => {
                        setEditOpen(false);
                        setSelectedItem(null);
                    }}
                />
            )}

            <table className="drop-shadow-m w-full border-collapse overflow-hidden rounded-md bg-white drop-shadow-md">
                <thead>
                    <tr className="bg-gray-100">
                        {tableHeaders.map((header) => (
                            <th key={header} className={commonHeaderClass}>
                                <div className="flex items-center justify-center gap-1">
                                    {header}
                                </div>
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {Orders.map((order) => (
                        <tr
                            key={order.id_pesanan}
                            className="border-b-2 border-gray-200 text-center"
                        >
                            {tableFields.map((field) => (
                                <td key={field} className={commonCellClass}>
                                    {order[field]}
                                </td>
                            ))}
                            <td className={commonCellClass}>
                                <button
                                    className="rounded bg-blue-500 px-2 py-2 text-white"
                                    onClick={() => {
                                        handleEdit(order);
                                    }}
                                >
                                    <PenIcon className="size-3 fill-white" />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(order.id_pesanan)
                                    }
                                    className="ml-2 rounded bg-red-500 px-2 py-2 text-white"
                                >
                                    <TrashIcon className="size-3 fill-white" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
