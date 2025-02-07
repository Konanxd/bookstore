import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TablePembayaran from "@/Components/Table/TablePembayaran";
export default function Pembayaran() {
    const { payments } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TablePembayaran payments={payments}></TablePembayaran>
        </AuthenticatedLayout>
    );
}
