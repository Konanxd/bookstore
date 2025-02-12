import { usePage } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import TablePesananBuku from "@/Components/Table/TablePesananBuku";
export default function PesananBuku() {
    const { book_orders } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TablePesananBuku orders={book_orders}></TablePesananBuku>
        </AuthenticatedLayout>
    );
}
