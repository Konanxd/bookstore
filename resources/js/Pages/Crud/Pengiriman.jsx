import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import TablePengiriman from "@/Components/Table/TablePengiriman";
export default function Pengiriman() {
    const { shipments } = usePage().props;

    return (
        <GuestLayout>
            <TablePengiriman shipments={shipments}></TablePengiriman>
        </GuestLayout>
    );
}
