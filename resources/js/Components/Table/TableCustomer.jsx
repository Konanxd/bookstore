import { useState } from "react";
import CrudHead from "../CrudHead";
import FormPelanggan from "../Form/FormPelanggan";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";
import { router } from "@inertiajs/react";

const tableHeaders = [
    "ID Pelanggan",
    "Nama Pelanggan",
    "no hp",
    "alamat",
    "aksi",
];

const tableFields = [
    "id_pelanggan",
    "nama_pelanggan",
    "no_hp",
    "alamat_pelanggan",
];

const commonCellClass = "py-5 relative";
const commonHeaderClass = "py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3 capitalize";

export default function TableCustomer({ customers }) {
    console.log(customers[1]);
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const handleEdit = (item) => {
        setSelectedItem(item);
        setEditOpen(true);
    };

    const handleAddItem = (newData) => {
        router.post("/pelanggan", newData, {
            onSuccess: () => {
                alert("Pelanggan berhasil ditambahkan!");
                setTambahOpen(false);
            },
            onError: () => {
                alert(
                    "Gagal menambahkan Pelanggan. Terjadi kesalahan atau judul Pelanggan sudah tersedia."
                );
            },
        });
    };

    const handleDelete = (id) => {
        if (window.confirm("Anda yakin ingin menghapus data ini?")) {
            router.delete(`/pelanggan/${id}`, {
                onSuccess: () => {
                    alert("Pelanggan berhasil dihapus!");
                },
                onError: () => {
                    alert(
                        "Terjadi kesalahan atau Pelanggan masih tersedia di tabel lain."
                    );
                },
            });
        }
    };

    const handleUpdate = (updatedData) => {
        router.put(`/pelanggan/${selectedItem.id_pelanggan}`, updatedData, {
            onSuccess: () => {
                alert("Buku berhasil diubah!");
                setEditOpen(false);
                setSelectedItem(null);
            },
            onError: () => {
                alert("Failed to update book.");
            },
        });
    };

    const searchCustomers = customers.filter((customer) =>
        customer.nama_pelanggan
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
    );

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead title="Pelanggan">
                <input
                    type="text"
                    placeholder="Cari Customer..."
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
                <FormPelanggan
                    onSubmit={handleAddItem}
                    onCancel={() => setTambahOpen(false)}
                />
            )}

            {EditOpen && selectedItem && (
                <FormPelanggan
                    data={selectedItem}
                    onSubmit={handleUpdate}
                    onCancel={() => {
                        setEditOpen(false);
                        setSelectedItem(null);
                    }}
                />
            )}

            <div className="w-full h-full overflow-x-scroll">
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
                        {searchCustomers.map((customer) => (
                            <tr
                                key={customer.id_pelanggan}
                                className="border-b-2 border-gray-200 text-center"
                            >
                                {tableFields.map((field) => (
                                    <td key={field} className={commonCellClass}>
                                        {customer[field]}
                                    </td>
                                ))}
                                <td className="px-2">
                                    <div className="flex flex-row">
                                        <button
                                            className="rounded bg-blue-500 px-2 py-2 text-white"
                                            onClick={() => {
                                                handleEdit(customer);
                                            }}
                                        >
                                            <PenIcon className="size-3 fill-white" />
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(
                                                    customer.id_pelanggan
                                                )
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
