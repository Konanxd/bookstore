import TableWriter from '@/Components/Table/TableWriter';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Penulis() {
    const penulisData = [
        {
            id_penulis: 1,
            nama_penulis: 'ABBAS',
        },
        {
            id_penulis: 2,
            nama_penulis: 'ABBAS',
        },
    ];
    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TableWriter writer={penulisData}></TableWriter>
            </div>
        </AuthenticatedLayout>
    );
}
