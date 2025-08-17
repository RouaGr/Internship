import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ExternalChurnChart = ({ churnCounts }) => {
  const labels = Object.keys(churnCounts);
  const values = Object.values(churnCounts);

  const data = {
    labels,
    datasets: [
      {
        label: "Number of Customers",
        data: values,
        backgroundColor: ["#ff4d4d", "#4da6ff"], // red for churn, blue for no churn
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "External Churn Dataset Distribution" },
    },
  };

  return <Bar data={data} options={options} />;
};

export default ExternalChurnChart;
