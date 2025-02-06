import { useState } from 'react';
import CrudHead from '../CrudHead';
import FormPublisher from '../Form/FormPublisher';
import PenIcon from '../Icon/PenIcon';
import TrashIcon from '../Icon/TrashIcon';

const tableHeaders = ['iD penerbit', 'nama penerbit', 'aksi'];

const tableFields = ['id_penerbit', 'nama_penerbit'];

const commonCellClass = 'py-5 relative';
const commonHeaderClass = 'py-5 xs:px-5 sm:px-5 md:px-5 lg:px-3 capitalize';

export default function TablePublisher({ publisher }) {
    const [TambahOpen, setTambahOpen] = useState(false);
    const [EditOpen, setEditOpen] = useState(false);

    return (
        <div className="mx-10 mt-10 flex flex-col gap-4">
            <CrudHead
                title="publisher"
                onClick={() => setTambahOpen(!TambahOpen)}
            />
            {TambahOpen && (
                <FormPublisher onClick={() => setTambahOpen(false)} />
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
                    {publisher.map((publisher) => (
                        <tr
                            key={publisher.id}
                            className="border-b-2 border-gray-200 text-center"
                        >
                            {tableFields.map((field) => (
                                <td key={field} className={commonCellClass}>
                                    {publisher[field]}
                                </td>
                            ))}
                            <td className={commonCellClass}>
                                <button
                                    className="rounded bg-blue-500 px-2 py-2 text-white"
                                    onClick={() => setTambahOpen(!TambahOpen)}
                                >
                                    <PenIcon className="size-3 fill-white" />
                                    {EditOpen && (
                                        <FormPublisher
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
