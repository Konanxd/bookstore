import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function GenreDistributionChart({ data }) {
    const chartData = {
        labels: data.map((item) => item.Genre),
        datasets: [
            {
                label: "Genre Distribution",
                data: data.map((item) => item.Total),
                backgroundColor: [
                    "#FF6384",
                    "#36A2EB",
                    "#FFCE56",
                    "#4BC0C0",
                    "#9966FF",
                    "#FF9F40",
                ],
                hoverOffset: 4,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.75,
        plugins: {
            legend: {
                position: "top",
                labels: {
                    padding: 20,
                },
            },
        },
    };
    return (
        <div className="bg-white p-5 rounded-2xl flex flex-col justify-between drop-shadow-md">
            <h2 className="text-center text-lg font-semibold my-4">
                Genre Distribution
            </h2>
            <Pie data={chartData} options={options} className="" />
        </div>
    );
}
