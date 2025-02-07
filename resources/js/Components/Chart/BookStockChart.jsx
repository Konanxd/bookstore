import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function BookStockChart({ data }) {
    if (!data || data.length === 0) return <p>No stock data available</p>;

    const chartData = {
        labels: data.map((item) => item.book),
        datasets: [
            {
                label: "Stock Levels",
                data: data.map((item) => item.stock),
                borderColor: "rgba(0,0,0,0)",
                borderWidth: 1,
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null;
                    const gradient = ctx.createLinearGradient(
                        0,
                        chartArea.top,
                        0,
                        chartArea.bottom
                    );
                    gradient.addColorStop(0, "rgba(132, 112, 255, 1)");
                    gradient.addColorStop(1, "rgba(132, 112, 255, .5)");
                    return gradient;
                },

                fill: true,
                tension: 0.3,
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
                Stokc Levels
            </h2>
            <Bar data={chartData} options={options} />
        </div>
    );
}
