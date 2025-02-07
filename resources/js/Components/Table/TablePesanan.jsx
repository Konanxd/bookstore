import { useState } from "react";
import CrudHead from "../CrudHead";
import FormPesanan from "../Form/FormPesanan";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";

const tableHeaders = [
    "ID pesanan",
    "ID pelanggan",
    "ID Buku",
    "Jumlah Pesanan",
    "Tanggal Pesanan",
    "Aksi",
];

const tableFields = [
    "id_pesanan",
    "id_pelanggan",
    "id_buku",
    "jumlah_pesanan",
    "tanggal_pesanan",
];

const commonCellClass = "py-5 relative";
const commonHeaderClass = "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3";

export default function TablePesanan({ orders }) {
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditOpen(true);
    };

    const handleAddItem = (newData) => {
        router.post("/pesanan", newData, {
            onSuccess: () => {
                alert("Pesanan berhasil ditambahkan!");
                setTambahOpen(false);
            },
            onError: () => {
                alert(
                    "Gagal menambahkan pesanan. Terjadi kesalahan atau judul pesanan sudah tersedia."
                );
            },
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Anda yakin ingin menghapus data ini?")) {
            router.delete(`/pesanan/${id}`, {
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
        router.put(`/pesanan/${selectedItem.id_pesanan}`, updatedData, {
            onSuccess: () => {
                alert("Pesanan berhasil diubah!");
                setEditOpen(false);
                setSelectedItem(null);
            },
            onError: () => {
                alert("Failed to update book.");
            },
        });
    };

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead
                title="Pesanan"
                onClick={() => setTambahOpen(!TambahOpen)}
            />
            {TambahOpen && (
                <FormPesanan
                    onSubmit={handleAddItem}
                    onCancel={() => setTambahOpen(false)}
                />
            )}

            {EditOpen && selectedItem && (
                <FormPesanan
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
                    {orders.map((order) => (
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
