import { usePage } from "@inertiajs/react";
import TablePembayaran from "@/Components/Table/TablePembayaran";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Pembayaran() {
    const { payments } = usePage().props;

    return (
        <AuthenticatedLayout>
            <div className="h-screen w-full overflow-y-scroll">
                <TablePembayaran payments={payments}></TablePembayaran>
            </div>
        </AuthenticatedLayout>
    );
}
