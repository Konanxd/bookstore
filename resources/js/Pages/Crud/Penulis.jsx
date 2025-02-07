import { usePage } from "@inertiajs/react";
import TableWriter from "@/Components/Table/TableWriter";
import GuestLayout from "@/Layouts/GuestLayout";
export default function Pelanggan() {
    const { authors } = usePage().props;

    return (
        <GuestLayout>
            <TableWriter authors={authors}></TableWriter>
        </GuestLayout>
    );
}
