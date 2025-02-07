import { useState } from "react";
import CrudHead from "../CrudHead";
import FormPengiriman from "../Form/FormPengiriman";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";
import { router } from "@inertiajs/react";

const tableHeaders = [
    "ID pengiriman",
    "ID pembayaran",
    "ID pesanan",
    "tanggal pengiriman",
    "status pengiriman",
    "no resi",
    "Aksi",
];

const tableFields = [
    "id_pengiriman",
    "id_pembayaran",
    "id_pesanan",
    "tanggal_pengiriman",
    "status_pengiriman",
    "no_resi",
];

const commonCellClass = "py-5 relative";
const commonHeaderClass = "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3";

export default function TablePengiriman({ shipments }) {
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditOpen(true);
    };

    const handleAddItem = (newData) => {
        router.post("/pengiriman", newData, {
            onSuccess: () => {
                alert("Pengiriman berhasil ditambahkan!");
                setTambahOpen(false);
            },
            onError: () => {
                alert(
                    "Gagal menambahkan pengiriman. Terjadi kesalahan atau judul pengiriman sudah tersedia."
                );
            },
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Anda yakin ingin menghapus data ini?")) {
            router.delete(`/pengiriman/${id}`, {
                onSuccess: () => {
                    alert("Pengiriman berhasil dihapus!");
                },
                onError: () => {
                    alert(
                        "Terjadi kesalahan atau pengiriman masih tersedia di tabel lain."
                    );
                },
            });
        }
    };

    const handleUpdate = (updatedData) => {
        router.put(`/pengiriman/${selectedItem.id_pengiriman}`, updatedData, {
            onSuccess: () => {
                alert("Pengiriman berhasil diubah!");
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
                title="Pengiriman"
                onClick={() => setTambahOpen(!TambahOpen)}
            />
            {TambahOpen && (
                <FormPengiriman
                    onSubmit={handleAddItem}
                    onCancel={() => setTambahOpen(false)}
                />
            )}

            {EditOpen && selectedItem && (
                <FormPengiriman
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
                    {shipments.map((shipment) => (
                        <tr
                            key={shipment.id_pengiriman}
                            className="border-b-2 border-gray-200 text-center"
                        >
                            {tableFields.map((field) => (
                                <td key={field} className={commonCellClass}>
                                    {shipment[field]}
                                </td>
                            ))}
                            <td className={commonCellClass}>
                                <button
                                    className="rounded bg-blue-500 px-2 py-2 text-white"
                                    onClick={() => {
                                        handleEdit(shipment);
                                    }}
                                >
                                    <PenIcon className="size-3 fill-white" />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(shipment.id_pengiriman)
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
