import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PredictionHistory = ({ data }) => {
  const churn = data["Churn"] || 0;
  const noChurn = data["No Churn"] || 0;
  const prediction_history = data["prediction_history"] || [];

  const total = churn + noChurn;

  const churnRate = total > 0 ? ((churn / total) * 100).toFixed(2) : 0;
  const noChurnRate = total > 0 ? ((noChurn / total) * 100).toFixed(2) : 0;

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
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : 0;
            return `${label}: ${value} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <h4 className="mb-3">Churn vs No Churn</h4>
          <div style={{ width: '80%', maxWidth: '350px' }}>
            <Pie data={chartData} options={options} />
          </div>
          <p className="mt-2 text-muted">
            Total predictions: <strong>{total}</strong>
          </p>
        </div>

        <div className="col-md-6">
          <h4 className="mb-3">Prediction Statistics</h4>
          <table className="table table-striped table-hover shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>Category</th>
                <th>Count</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Churn</td>
                <td>{churn}</td>
                <td>{churnRate}%</td>
              </tr>
              <tr>
                <td>No Churn</td>
                <td>{noChurn}</td>
                <td>{noChurnRate}%</td>
              </tr>
              <tr className="table-info">
                <td><strong>Total</strong></td>
                <td><strong>{total}</strong></td>
                <td><strong>100%</strong></td>
              </tr>
            </tbody>
          </table>

          <div className="alert alert-secondary mt-3">
            <strong>Accuracy:</strong> This represents the proportion of correct predictions
            (needs comparison with actual data). Currently showing distribution only.
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h4 className="mb-3">Prediction History Details</h4>
          <div className="table-responsive">
            <table className="table table-striped table-hover shadow-sm">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Account Weeks</th>
                  <th>Contract Renewal</th>
                  <th>Data Plan</th>
                  <th>Data Usage</th>
                  <th>Service Calls</th>
                  <th>Day Mins</th>
                  <th>Day Calls</th>
                  <th>Monthly Charge</th>
                  <th>Overage Fee</th>
                  <th>Roam Mins</th>
                  <th>Prediction</th>
                  <th>Probability</th>
                </tr>
              </thead>
              <tbody>
                {prediction_history.map((prediction, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{prediction.AccountWeeks}</td>
                    <td>{prediction.ContractRenewal ? 'Yes' : 'No'}</td>
                    <td>{prediction.DataPlan ? 'Yes' : 'No'}</td>
                    <td>{prediction.DataUsage.toFixed(2)}</td>
                    <td>{prediction.CustServCalls}</td>
                    <td>{prediction.DayMins.toFixed(2)}</td>
                    <td>{prediction.DayCalls}</td>
                    <td>${prediction.MonthlyCharge.toFixed(2)}</td>
                    <td>${prediction.OverageFee.toFixed(2)}</td>
                    <td>{prediction.RoamMins.toFixed(2)}</td>
                    <td>
                      <span className={`badge ${prediction.prediction === 'Churn' ? 'bg-danger' : 'bg-success'}`}>
                        {prediction.prediction}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${prediction.probability_of_churn > 0.5 ? 'bg-warning text-dark' : 'bg-info'}`}>
                        {(prediction.probability_of_churn * 100).toFixed(1)}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {prediction_history.length === 0 && (
            <div className="alert alert-info text-center mt-3">
              No prediction history available. Make some predictions to see them here.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionHistory;