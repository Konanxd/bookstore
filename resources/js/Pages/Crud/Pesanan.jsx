import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import TablePesanan from "@/Components/Table/TablePesanan";
export default function Pesanan() {
    const { orders } = usePage().props;

    return (
        <GuestLayout>
            <TablePesanan orders={orders}></TablePesanan>
        </GuestLayout>
    );
}
