import Navbar from "@/Components/navbar";
import TableBook from "@/Components/Table/TableBook";
import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Dashboard() {
    const { books } = usePage().props;

    return (
        <GuestLayout>
            <TableBook books={books}></TableBook>
        </GuestLayout>
    );
}
