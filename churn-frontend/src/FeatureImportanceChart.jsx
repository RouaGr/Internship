import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeatureImportanceChart = ({ labels, importances }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Feature Importance',
        data: importances,
        backgroundColor: 'rgba(75,192,192,0.4)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top Features in Churn Prediction',
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default FeatureImportanceChart;