import { usePage } from "@inertiajs/react";
import TablePublisher from "@/Components/Table/TablePublisher";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
export default function Penerbit() {
    const { publishers } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TablePublisher publishers={publishers}></TablePublisher>
        </AuthenticatedLayout>
    );
}
