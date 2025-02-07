import { usePage } from "@inertiajs/react";
import TableGenre from "@/Components/Table/TableGenre";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Genre() {
    const { genres } = usePage().props;

    return (
        <AuthenticatedLayout>
            <TableGenre genres={genres}></TableGenre>
        </AuthenticatedLayout>
    );
}
