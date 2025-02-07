import React, { useRef } from "react";
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
    PointElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function LineChart(data) {
    const chartData = {
        labels: data.map((item) => item.month),
        datasets: [
            {
                label: "Books Sold Over Time",
                data: data.map((item) => item.total_sold),
                borderColor: "rgba(255, 99, 132, 1)",

                fill: true,
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
            },
        },
        plugins: {
            legend: {
                position: "bottom",
                labels: {
                    padding: 20,
                },
            },
        },
    };

    return (
        <div className="bg-white p-5 rounded-2xl w-full flex justify-center drop-shadow-md">
            <Line ref={chartRef} data={chartData} options={options} />
        </div>
    );
}
