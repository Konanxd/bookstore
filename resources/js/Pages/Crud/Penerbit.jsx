import { usePage } from "@inertiajs/react";
import TablePublisher from "@/Components/Table/TablePublisher";
import GuestLayout from "@/Layouts/GuestLayout";
export default function Penerbit() {
    const { publishers } = usePage().props;

    return (
        <GuestLayout>
            <TablePublisher publishers={publishers}></TablePublisher>
        </GuestLayout>
    );
}
