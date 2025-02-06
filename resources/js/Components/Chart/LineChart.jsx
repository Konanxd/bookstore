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

export default function LineChart() {
  const chartRef = useRef(null);

  const data = {
    labels: ["A", "B", "C", "D", "E", "F", "G"],
    datasets: [
      {
        label: "Dataset 1",
        data: [65, 59, 80, 81, 56, 55, 40],
        borderColor: "rgba(132, 112, 255, 1)",

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
          gradient.addColorStop(0, "rgba(132, 112, 255, 0.5)");
          gradient.addColorStop(1, "rgba(132, 112, 255, 0)");
          return gradient;
        },

        fill: true,
        tension: 0.3,
      },
      {
        label: "Dataset 2",
        data: [10, 29, 60, 41, 56, 85, 10],
        borderColor: "rgba(255, 99, 132, 1)",

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
          gradient.addColorStop(0, "rgba(255, 99, 132, 0.5)");
          gradient.addColorStop(1, "rgba(255, 99, 132, 0)");
          return gradient;
        },
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
    <div className="bg-white p-5 rounded-2xl w-full h-96 flex justify-center">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
}
