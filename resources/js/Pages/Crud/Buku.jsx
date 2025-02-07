import { usePage } from "@inertiajs/react";
import TableBook from "@/Components/Table/TableBook";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Buku() {
    const { books } = usePage().props;

    return (
        <GuestLayout>
            <TableBook books={books}></TableBook>
        </GuestLayout>
    );
}
