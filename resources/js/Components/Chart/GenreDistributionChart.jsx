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

    return (
        <div className="w-1/2 mx-auto">
            <h2 className="text-center text-lg font-semibold my-4">
                Genre Distribution
            </h2>
            <Pie data={chartData} />
        </div>
    );
}
