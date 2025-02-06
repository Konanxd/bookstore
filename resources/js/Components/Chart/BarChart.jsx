import React, { useRef, useEffect } from "react";
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

export default function BarChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = chartRef.current;
      const ctx = chartInstance.ctx;

      // Gradient untuk dataset pertama
      const gradient1 = ctx.createLinearGradient(0, 0, 0, 400);
      gradient1.addColorStop(0, "rgba(222, 222, 222, 1)");
      gradient1.addColorStop(1, "rgba(222, 222, 222, 1)");

      // Gradient untuk dataset kedua
      const gradient2 = ctx.createLinearGradient(0, 0, 0, 400);
      gradient2.addColorStop(0, "rgba(132, 112, 255, 1)");
      gradient2.addColorStop(1, "rgba(132, 112, 255, 1)");

      // Terapkan gradient ke dataset
      chartInstance.data.datasets[0].backgroundColor = gradient1;
      chartInstance.data.datasets[1].backgroundColor = gradient2;
      chartInstance.update();
    }
  }, []);

  const data = {
    labels: ["A", "B", "C"],
    datasets: [
      {
        label: "Revenue 1",
        data: [200, 300, 400], // Nilai maksimal agar batang penuh
        borderWidth: 0,
        BarThickness: 50,
        // maxBarThickness: 80,
      },
      {
        label: "Revenue 2",
        data: [100, 200, 300], // Nilai tetap tinggi
        borderWidth: 0,
        BarThickness: 50,
        // maxBarThickness: 80,
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
        display: true,
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
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
}
