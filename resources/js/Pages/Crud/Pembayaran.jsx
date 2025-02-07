import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import TablePembayaran from "@/Components/Table/TablePembayaran";
export default function Pembayaran() {
    const { payments } = usePage().props;

    return (
        <GuestLayout>
            <TablePembayaran payments={payments}></TablePembayaran>
        </GuestLayout>
    );
}
