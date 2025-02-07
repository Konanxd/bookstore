import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TablePesanan from "@/Components/Table/TablePesanan";
export default function Pesanan() {
    const { orders } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TablePesanan orders={orders}></TablePesanan>
        </AuthenticatedLayout>
    );
}
