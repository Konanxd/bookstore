import TablePenerbit from '@/Components/Table/TablePublisher';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Penerbit() {
    const penerbitData = [
        {
            id_penerbit: 1,
            nama_penerbit: 'ABBAS',
        },
        {
            id_penerbit: 2,
            nama_penerbit: 'ABBAS',
        },
    ];
    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TablePenerbit publisher={penerbitData}></TablePenerbit>
            </div>
        </AuthenticatedLayout>
    );
}
