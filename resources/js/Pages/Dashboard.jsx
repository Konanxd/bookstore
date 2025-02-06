import Navbar from "@/Components/navbar";
import TableBook from "@/Components/Table/TableBook";
import { usePage } from "@inertiajs/react";

export default function Dashboard() {
    const { books } = usePage().props;

    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="h-screen w-full overflow-y-scroll">
                <TableBook books={books}></TableBook>
            </div>
        </div>
    );
}
