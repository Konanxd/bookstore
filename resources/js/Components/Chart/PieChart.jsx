import React from "react";
import { Pie } from "react-chartjs-2";

export default function PieChart() {
  const data = {
    labels: ["Red", "Blue", "Yellow"],
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
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
      <Pie data={data} options={options} />
    </div>
  );
}
