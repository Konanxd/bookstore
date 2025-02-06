import { useState } from "react";
import CrudHead from "../CrudHead";
import FormPesanan from "../Form/FormPesanan";
import PenIcon from "../Icon/PenIcon";
import TrashIcon from "../Icon/TrashIcon";

const tableHeaders = [
    "ID pesanan",
    "ID pelanggan",
    "ID Buku",
    "jumlah pesnaan",
    "tanggal_pesanan",

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

export default function TablePesanan({ pesanan }) {
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead
                title="pesanan"
                onClick={() => setTambahOpen(!TambahOpen)}
            />
            {TambahOpen && <FormPesanan onClick={() => setTambahOpen(false)} />}

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
                    {pesanan.map((pesnan) => (
                        <tr
                            key={pesnan.id}
                            className="border-b-2 border-gray-200 text-center"
                        >
                            {tableFields.map((field) => (
                                <td key={field} className={commonCellClass}>
                                    {pesnan[field]}
                                </td>
                            ))}
                            <td className={commonCellClass}>
                                <button
                                    className="rounded bg-blue-500 px-2 py-2 text-white"
                                    onClick={() => setTambahOpen(!TambahOpen)}
                                >
                                    <PenIcon className="size-3 fill-white" />
                                    {EditOpen && (
                                        <FormPesanan
                                            onClick={() => setEditOpen(false)}
                                        />
                                    )}
                                </button>
                                <button className="ml-2 rounded bg-red-500 px-2 py-2 text-white">
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
