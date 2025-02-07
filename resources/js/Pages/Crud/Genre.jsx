import { usePage } from "@inertiajs/react";
import TableGenre from "@/Components/Table/TableGenre";
import GuestLayout from "@/Layouts/GuestLayout";

export default function Genre() {
    const { genres } = usePage().props;

    return (
        <GuestLayout>
            <TableGenre genres={genres}></TableGenre>
        </GuestLayout>
    );
}
