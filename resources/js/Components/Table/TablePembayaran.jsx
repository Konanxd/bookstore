import { useState, useEffect } from "react";
import CrudHead from "../CrudHead";
import FormPembayaran from "../Form/FormPembayaran";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";
import { router, usePage } from "@inertiajs/react";

const tableHeaders = [
    "ID Pesanan",
    "ID Pembayaran",
    "Tanggal Pembayaran",
    "Total Pembayaran",
    "Status Pembayaran",
    "Dibuat Pada",
    "Diperbarui Pada",
    "Aksi",
];

const tableFields = [
    "id_pesanan",
    "id_pembayaran",
    "tanggal_pembayaran",
    "total_pembayaran",
    "stat_pembayaran",
    "created_at",
    "updated_at",
];

const commonCellClass = "py-5 relative";
const commonHeaderClass = "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3 capitalize";

export default function TablePembayaran({ payments }) {
    // const { payments } = usePage().props;
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedPembayaran] = useState(null);

    const handleEdit = (pembayaran) => {
        setSelectedPembayaran(pembayaran);
        setEditOpen(true);
    };

    const handleAddPembayaran = (newData) => {
        router.post("/pembayaran", newData, {
            onSuccess: () => {
                alert("pembayaran berhasil ditambahkan!");
                setTambahOpen(false);
            },
            onError: () => {
                alert(
                    "Gagal menambahkan Pembayaran. Terjadi kesalahan atau Pembayaran sudah tersedia."
                );
            },
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Anda yakin ingin menghapus data ini?")) {
            router.delete(`/pembayaran/${id}`, {
                onSuccess: () => {
                    alert("pembayaran berhasil dihapus!");
                },
                onError: () => {
                    alert(
                        "Terjadi kesalahan atau pembayaran masih tersedia di tabel lain."
                    );
                },
            });
        }
    };

    const handleUpdate = (updatedData) => {
        router.put(`/pembayaran/${selectedItem.id_pembayaran}`, updatedData, {
            onSuccess: () => {
                alert("pembayaran berhasil diubah!");
                setEditOpen(false);
                selectedItem(null);
            },
            onError: () => {
                alert("Failed to update pembayaran.");
            },
        });
    };

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead
                title="pembayaran"
                onClick={() => setTambahOpen(!TambahOpen)}
            />
            {TambahOpen && (
                <FormPembayaran
                    onSubmit={handleAddPembayaran}
                    onCancel={() => setTambahOpen(false)}
                />
            )}

            {EditOpen && (
                <FormPembayaran
                    data={selectedItem}
                    onSubmit={handleUpdate}
                    onCancel={() => {
                        setEditOpen(false);
                        selectedItem(null);
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
                    {payments.map((payment) => (
                        <tr
                            key={payment.id_pembayaran}
                            className="border-b-2 border-gray-200 text-center"
                        >
                            {tableFields.map((field) => (
                                <td key={field} className={commonCellClass}>
                                    {payment[field]}
                                </td>
                            ))}
                            <td className={commonCellClass}>
                                <button
                                    className="rounded bg-blue-500 px-2 py-2 text-white"
                                    onClick={() => {
                                        handleEdit(payment);
                                    }}
                                >
                                    <PenIcon className="size-3 fill-white" />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(payment.id_pembayaran)
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
