import TableCustomer from '@/Components/Table/TableCustomer';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Pelanggan() {
    const customerData = [
        {
            id_pelanggan: 2,
            nama_pelanggan: 'ABBAS',
            no_hp: '089898989',
            alamat: 'bandung',
        },
        {
            id_pelanggan: 2,
            nama_pelanggan: 'ABBAS',
            no_hp: '089898989',
            alamat: 'bandung',
        },
    ];
    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TableCustomer customer={customerData}></TableCustomer>
            </div>
        </AuthenticatedLayout>
    );
}
