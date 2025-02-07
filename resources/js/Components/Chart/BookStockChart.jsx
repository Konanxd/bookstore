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
            y: { title: { displplay: true } },
        },
    };

    return <Bar data={chartData} options={options} />;
}
