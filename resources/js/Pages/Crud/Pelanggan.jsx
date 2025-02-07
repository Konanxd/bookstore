import { usePage } from "@inertiajs/react";
import TableCustomer from "@/Components/Table/TableCustomer";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Pelanggan() {
    const { customers } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TableCustomer customers={customers}></TableCustomer>
        </AuthenticatedLayout>
    );
}
