import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PredictionHistory = ({ data }) => {
  // Fallback values to guarantee 2 categories
  const churn = data["Churn"] || 0;
  const noChurn = data["No Churn"] || 0;

  const chartData = {
    labels: ['Churn', 'No Churn'],
    datasets: [{
      label: 'Prediction Count',
      data: [churn, noChurn],
      backgroundColor: ['#FF6384', '#36A2EB'],
      borderWidth: 1
    }],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.raw;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto' }}>
      <Pie data={chartData} options={options} />
      <p style={{ textAlign: 'center' }}>
        Total predictions: {churn + noChurn}
      </p>
    </div>
  );
};

export default PredictionHistory;
