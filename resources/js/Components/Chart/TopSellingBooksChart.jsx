import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
);

const TopSellingBooksChart = ({ data }) => {
    const chartData = {
        labels: data.map((book) => book.judul),
        datasets: [
            {
                label: "Total Sold",
                data: data.map((book) => book.total_sold),
                backgroundColor: "rgba(54, 162, 235, 0.6)",
                borderColor: "rgba(54, 162, 235, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        indexAxis: "y",
        scales: {
            x: { beginAtZero: true },
            y: {
                title: { displplay: true },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="bg-white p-5 rounded-2xl h-full flex flex-col justify-between drop-shadow-md">
            <h2 className="text-center text-lg font-semibold my-4">
                Top Selling Books
            </h2>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default TopSellingBooksChart;
