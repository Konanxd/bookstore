import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TablePengiriman from "@/Components/Table/TablePengiriman";
export default function Pengiriman() {
    const { shipments } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TablePengiriman shipments={shipments}></TablePengiriman>
        </AuthenticatedLayout>
    );
}
