import { Line } from "react-chartjs-2";
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

export default function SalesOverTimeChart({ data }) {
    const chartData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "Books Sold Over Time",
                data: data.map((item) => item.total_sold),
                borderColor: "rgba(255, 99, 132, 1)",
                backgroundColor: "rgba(255, 99, 132, 0.2)",
                borderWidth: 2,
                pointRadius: 5,
            },
        ],
    };

    const options = {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true,
                title: { display: true, text: "Total Books Sold" },
            },
            x: {
                title: { display: true, text: "Date" },
                grid: {
                    display: false,
                },
            },
        },
    };

    return (
        <div className="bg-white p-5 rounded-2xl h-96 flex flex-col justify-between drop-shadow-md">
            <h2 className="text-center text-lg font-semibold my-4">
                Total Sold Books
            </h2>
            <Line data={chartData} options={options} />
        </div>
    );
}
