import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import GenreDistributionChart from "@/Components/Chart/GenreDistributionChart";
import BookStockChart from "@/Components/Chart/BookStockChart";
import SalesOverTimeChart from "@/Components/Chart/SalesOverTimeChart";
import TopSellingBooksChart from "@/Components/Chart/TopSellingBooksChart";

export default function Dashboard() {
    const {
        genreDistribution,
        bookStockLevels,
        salesOverTime,
        topSellingBooks,
    } = usePage().props;
    // console.log(topSellingBooks[1]);

    return (
        <GuestLayout>
            <div className="grid grid-cols-2 m-10 gap-5">
                <GenreDistributionChart data={genreDistribution} />
                <BookStockChart data={bookStockLevels} />
                <SalesOverTimeChart data={salesOverTime} />
                <TopSellingBooksChart data={topSellingBooks} />
            </div>
        </GuestLayout>
    );
}
