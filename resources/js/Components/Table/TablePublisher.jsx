import { useState } from "react";
import CrudHead from "../CrudHead";
import FormPublisher from "../Form/FormPublisher";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";
import { router } from "@inertiajs/react";

const tableHeaders = ["ID penerbit", "Nama Penerbit", "Aksi"];

const tableFields = ["id_penerbit", "nama_penerbit"];

const commonCellClass = "py-5 relative";
const commonHeaderClass = "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3 capitalize";

export default function TablePublisher({ publishers }) {
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditOpen(true);
    };

    const handleAddItem = (newData) => {
        router.post("/penerbit", newData, {
            onSuccess: () => {
                alert("Penerbit berhasil ditambahkan!");
                setTambahOpen(false);
            },
            onError: () => {
                alert(
                    "Gagal menambahkan penerbit. Terjadi kesalahan atau judul penerbit sudah tersedia."
                );
            },
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Anda yakin ingin menghapus data ini?")) {
            router.delete(`/penerbit/${id}`, {
                onSuccess: () => {
                    alert("Penerbit berhasil dihapus!");
                },
                onError: () => {
                    alert(
                        "Terjadi kesalahan atau penerbit masih tersedia di tabel lain."
                    );
                },
            });
        }
    };

    const handleUpdate = (updatedData) => {
        router.put(`/penerbit/${selectedItem.id_penerbit}`, updatedData, {
            onSuccess: () => {
                alert("Penerbit berhasil diubah!");
                setEditOpen(false);
                setSelectedItem(null);
            },
            onError: () => {
                alert("Failed to update book.");
            },
        });
    };
    const searchPublisher = publishers.filter((Publisher) =>
        Publisher.nama_penerbit
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead
                title="Publisher"
                onClick={() => setTambahOpen(!TambahOpen)}
            >
                <input
                    type="text"
                    placeholder="Cari Penerbit..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
                <button
                    type="button"
                    className="rounded-md bg-blue-500 px-3 py-2 text-sm font-semibold uppercase text-white hover:bg-blue-400"
                    onClick={() => setTambahOpen(!TambahOpen)}
                >
                    tambah
                </button>
            </CrudHead>
            {TambahOpen && (
                <FormPublisher
                    onSubmit={handleAddItem}
                    onCancel={() => setTambahOpen(false)}
                />
            )}

            {EditOpen && selectedItem && (
                <FormPublisher
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
                    {searchPublisher.map((penerbit) => (
                        <tr
                            key={penerbit.id_penerbit}
                            className="border-b-2 border-gray-200 text-center"
                        >
                            {tableFields.map((field) => (
                                <td key={field} className={commonCellClass}>
                                    {penerbit[field]}
                                </td>
                            ))}
                            <td className={commonCellClass}>
                                <button
                                    className="rounded bg-blue-500 px-2 py-2 text-white"
                                    onClick={() => {
                                        handleEdit(penerbit);
                                    }}
                                >
                                    <PenIcon className="size-3 fill-white" />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(penerbit.id_penerbit)
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
