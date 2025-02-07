import { usePage } from "@inertiajs/react";
import TableWriter from "@/Components/Table/TableWriter";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Pelanggan() {
    const { authors } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TableWriter authors={authors}></TableWriter>
        </AuthenticatedLayout>
    );
}
