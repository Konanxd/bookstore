import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import GenreDistributionChart from "@/Components/Chart/GenreDistributionChart";
import BookStockChart from "@/Components/Chart/BookStockChart";
import SalesOverTimeChart from "@/Components/Chart/SalesOverTimeChart";
import TopSellingBooksChart from "@/Components/Chart/TopSellingBooksChart";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard() {
    const {
        genreDistribution,
        bookStockLevels,
        salesOverTime,
        topSellingBooks,
    } = usePage().props;
    // console.log(topSellingBooks[1]);

    return (
        <AuthenticatedLayout>
            <div className="flex flex-col items-center w-full p-5 gap-5">
                <h1 className="text-xl font-bold uppercase bg-white drop-shadow-sm w-full py-5 text-center rounded-xl">
                    Analisis Penjualan 2024
                </h1>
                <div className="grid grid-cols-2 gap-5 w-full">
                    <GenreDistributionChart data={genreDistribution} />
                    <BookStockChart data={bookStockLevels} />
                    <SalesOverTimeChart data={salesOverTime} />
                    <TopSellingBooksChart data={topSellingBooks} />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
