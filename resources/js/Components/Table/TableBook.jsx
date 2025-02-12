import { useState, useEffect } from "react";
import CrudHead from "../CrudHead";
import FormBuku from "../Form/FormBuku";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";
import { router, usePage } from "@inertiajs/react";
import axios from "axios";

const tableHeaders = [
    "ID Buku",
    "Judul",
    "Penulis",
    "ISBN",
    "Penerbit",
    "Tanggal Terbit",
    "Genre",
    "Harga",
    "Stok",
    "Aksi",
];

const tableFields = [
    "id_buku",
    "judul",
    "nama_penulis",
    "isbn",
    "nama_penerbit",
    "tanggal_terbit",
    "nama_genre",
    "harga",
    "stok",
];

const commonCellClass = "py-5";
const commonHeaderClass = "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3";

export function book() {}

export default function TableBook() {
    const { books } = usePage().props;
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleEdit = (book) => {
        setSelectedBook(book);
        setEditOpen(true);
    };

    const handleAddBook = (newData) => {
        router.post("/buku", newData, {
            onSuccess: () => {
                alert("Buku berhasil ditambahkan!");
                setTambahOpen(false);
            },
            onError: () => {
                alert(
                    "Gagal menambahkan buku. Terjadi kesalahan atau judul buku sudah tersedia."
                );
            },
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Anda yakin ingin menghapus data ini?")) {
            router.delete(`/buku/${id}`, {
                onSuccess: () => {
                    alert("Buku berhasil dihapus!");
                },
                onError: () => {
                    alert(
                        "Terjadi kesalahan atau buku masih tersedia di tabel lain."
                    );
                },
            });
        }
    };

    const handleUpdate = (updatedData) => {
        router.put(`/buku/${selectedBook.id_buku}`, updatedData, {
            onSuccess: () => {
                alert("Book updated successfully!");
                setEditOpen(false);
                setSelectedBook(null);
            },
            onError: () => {
                alert("Failed to update book.");
            },
        });
    };

    const seacrhBook = books.filter((book) =>
        book.judul.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead title="Buku" onClick={() => setTambahOpen(true)}>
                <input
                    type="text"
                    placeholder="Cari buku..."
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
                <FormBuku
                    onSubmit={handleAddBook}
                    onCancel={() => setTambahOpen(false)}
                />
            )}

            {EditOpen && selectedBook && (
                <FormBuku
                    book={selectedBook}
                    onSubmit={handleUpdate}
                    onCancel={() => {
                        setEditOpen(false);
                        setSelectedBook(null);
                    }}
                />
            )}

            <div className=" w-full h-full overflow-x-scroll">
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
                        {seacrhBook.map((book) => (
                            <tr
                                key={book.id_buku}
                                className="border-b-2 border-gray-200 text-center"
                            >
                                {tableFields.map((field) => (
                                    <td key={field} className={commonCellClass}>
                                        {book[field]}
                                    </td>
                                ))}
                                <td className="px-2">
                                    <div className=" flex flex-row justify-center items-center">
                                        <button
                                            className="rounded bg-blue-500 px-2 py-2 text-white"
                                            onClick={() => {
                                                handleEdit(book);
                                            }}
                                        >
                                            <PenIcon className="size-3 fill-white" />
                                        </button>

                                        <button
                                            onClick={() =>
                                                handleDelete(book.id_buku)
                                            }
                                            className="ml-2 rounded bg-red-500 px-2 py-2 text-white"
                                        >
                                            <TrashIcon className="size-3 fill-white" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
