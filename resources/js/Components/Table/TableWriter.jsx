import { useState } from "react";
import CrudHead from "../CrudHead";
import FormPenulis from "../Form/FormPenulis";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";
import { router } from "@inertiajs/react";

const tableHeaders = ["iD penulis", "nama penulis", "aksi"];

const tableFields = ["id_penulis", "nama_penulis"];

const commonCellClass = "py-5 relative";
const commonHeaderClass = "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3 capitalize";

export default function TableWriter({ authors }) {
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditOpen(true);
    };

    const handleAddItem = (newData) => {
        router.post("/penulis", newData, {
            onSuccess: () => {
                alert("Penulis berhasil ditambahkan!");
                setTambahOpen(false);
            },
            onError: () => {
                alert(
                    "Gagal menambahkan penulis. Terjadi kesalahan atau judul penulis sudah tersedia."
                );
            },
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Anda yakin ingin menghapus data ini?")) {
            router.delete(`/penulis/${id}`, {
                onSuccess: () => {
                    alert("Penulis berhasil dihapus!");
                },
                onError: () => {
                    alert(
                        "Terjadi kesalahan atau penulis masih tersedia di tabel lain."
                    );
                },
            });
        }
    };

    const handleUpdate = (updatedData) => {
        router.put(`/penulis/${selectedItem.id_penulis}`, updatedData, {
            onSuccess: () => {
                alert("Penulis berhasil diubah!");
                setEditOpen(false);
                setSelectedItem(null);
            },
            onError: () => {
                alert("Failed to update book.");
            },
        });
    };
    const searchAuthors = authors.filter((author) =>
        author.nama_penulis.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead
                title="Penulis"
                onClick={() => setTambahOpen(!TambahOpen)}
            >
                <input
                    type="text"
                    placeholder="Cari Penulis..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="p-2 border rounded-md w-full"
                />
            </CrudHead>
            {TambahOpen && (
                <FormPenulis
                    onSubmit={handleAddItem}
                    onCancel={() => setTambahOpen(false)}
                />
            )}

            {EditOpen && selectedItem && (
                <FormPenulis
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
                    {searchAuthors.map((author) => (
                        <tr
                            key={author.id_penulis}
                            className="border-b-2 border-gray-200 text-center"
                        >
                            {tableFields.map((field) => (
                                <td key={field} className={commonCellClass}>
                                    {author[field]}
                                </td>
                            ))}
                            <td className={commonCellClass}>
                                <button
                                    className="rounded bg-blue-500 px-2 py-2 text-white"
                                    onClick={() => {
                                        handleEdit(author);
                                    }}
                                >
                                    <PenIcon className="size-3 fill-white" />
                                </button>
                                <button
                                    onClick={() =>
                                        handleDelete(author.id_penulis)
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
