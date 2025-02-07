import { usePage } from "@inertiajs/react";
import GuestLayout from "@/Layouts/GuestLayout";
import GenreDistributionChart from "@/Components/Chart/GenreDistributionChart";
import BookStockChart from "@/Components/Chart/BookStockChart";
import SalesOverTimeChart from "@/Components/Chart/SalesOverTimeChart";
import LineChart from "@/Components/Chart/LineChart";

export default function Dashboard() {
    const { genreDistribution, bookStockLevels, salesOverTime } =
        usePage().props;
    // console.log(salesOverTime);

    return (
        <GuestLayout>
            <div className="grid grid-cols-2 m-10 gap-5">
                <GenreDistributionChart data={genreDistribution} />
                <BookStockChart data={bookStockLevels} />
                <SalesOverTimeChart data={salesOverTime} />
            </div>
        </GuestLayout>
    );
}
