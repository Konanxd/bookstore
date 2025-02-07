import { usePage } from "@inertiajs/react";
import TableBook from "@/Components/Table/TableBook";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Buku() {
    const { books } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TableBook books={books}></TableBook>
        </AuthenticatedLayout>
    );
}
