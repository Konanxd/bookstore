import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import TablePengiriman from "@/Components/Table/TablePengiriman";

export default function Pengiriman() {
    const { shipments } = usePage().props;

    return (
        <GuestLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TablePengiriman shipments={shipments}></TablePengiriman>
            </div>
        </GuestLayout>
    );
}
