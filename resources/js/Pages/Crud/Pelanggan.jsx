import { usePage } from "@inertiajs/react";
import TableCustomer from "@/Components/Table/TableCustomer";
import GuestLayout from "@/Layouts/GuestLayout";
export default function Pelanggan() {
    const { customers } = usePage().props;

    return (
        <GuestLayout>
            <TableCustomer customers={customers}></TableCustomer>
        </GuestLayout>
    );
}
