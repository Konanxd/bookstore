import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart({ data }) {
    const chartData = {
        labels: data.map((item) => item.genre),
        datasets: [
            {
                label: "My First Dataset",
                data: data.map((item) => item.total),
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
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 30,
                },
            },
        },
    };

    return (
        <div className="bg-white p-5 rounded-2xl h-96 flex flex-col justify-center">
            <Pie data={chartData} options={options} />
        </div>
    );
}
