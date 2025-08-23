import { useState } from "react";
import axios from 'axios';

const Predict = ({ onPredictionUpdate }) => {
  const [form, setForm] = useState({
    AccountWeeks: 100,
    ContractRenewal: 1,
    DataPlan: 1,
    DataUsage: 2.5,
    CustServCalls: 2,
    DayMins: 200,
    DayCalls: 100,
    MonthlyCharge: 70.5,
    OverageFee: 9.0,
    RoamMins: 12,
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? (checked ? 1 : 0) : parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/predict', form);
      setResult(res.data);
      
      if (onPredictionUpdate && res.data) {
        onPredictionUpdate(res.data.prediction);
      }
    } catch (err) {
      console.error("Prediction request failed:", err);
      alert("Failed to get prediction. Check your backend server or CORS settings.");
    }
  };

  const fields = [
    { name: "AccountWeeks", label: "Account Weeks", type: "number" },
    { name: "DataPlan", label: "Data Plan", type: "checkbox" },
    { name: "ContractRenewal", label: "Contract Renewal", type: "checkbox" },
    { name: "DataUsage", label: "Data Usage", type: "number" },
    { name: "CustServCalls", label: "Customer Service Calls", type: "number" },
    { name: "DayMins", label: "Day Minutes", type: "number" },
    { name: "DayCalls", label: "Day Calls", type: "number" },
    { name: "MonthlyCharge", label: "Monthly Charge", type: "number" },
    { name: "OverageFee", label: "Overage Fee", type: "number" },
    { name: "RoamMins", label: "Roam Minutes", type: "number" },
  ];

  const alertType = result ? (result.prediction === "Churn" ? "danger" : "success") : "info";
  const alertHeading = result ? (result.prediction  === "Churn" ? "Churn Alert!" : "Customer Retained!") : "No Prediction Yet";
  const alertMessage = result 
    ? result.prediction
      ? `This customer has a ${(result.probability_of_churn * 100).toFixed(2)}% chance of churning. Immediate action is recommended.`
      : `This customer has a low churn probability (${(result.probability_of_churn * 100).toFixed(2)}%). They are likely to stay with our service.`
    : "Submit the form to get a churn prediction.";
  const alertDetails = result
    ? result.prediction
      ? "Consider offering a special discount, improved plan, or personalized outreach to retain this customer."
      : "Continue providing excellent service and consider upselling opportunities to enhance customer loyalty."
    : "Fill out the customer details and click 'Predict Churn' to get started.";

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-10">
          <div className="card shadow">
            <div className="card-header bg-primary text-white pt-3">
              <h2 className="text-center">Customer Churn Prediction</h2>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  {fields.map(({ name, label, type }) => (
                    <div key={name} className="col-md-6 form-group mb-3">
                      <label htmlFor={name} className="form-label">{label}</label>
                      {type === "checkbox" ? (
                        <input
                          className="form-control"
                          type="number"
                          min={0}
                          max={1}
                          id={name}
                          value={form[name]}
                          name={name}
                          onChange={handleChange}
                        />
                      ) : (
                        <input
                          type={type}
                          className="form-control"
                          id={name}
                          name={name}
                          value={form[name]}
                          onChange={handleChange}
                          step={type === "number" ? "any" : undefined}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <div className="row mt-4">
                  <div className="col text-center">
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-lg px-5"
                    >
                      Predict Churn
                    </button>
                  </div>
                </div>
              </form>

              {result && (
                <div className="mt-4">
                  <div className={`alert alert-${alertType}`} role="alert">
                    <h4 className="alert-heading">{alertHeading}</h4>
                    <p>{alertMessage}</p>
                    <hr />
                    <p className="mb-0">{alertDetails}</p>
                  </div>

                  <div className="mt-3">
                    <h5>Prediction Details:</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <strong>Prediction:</strong> {result.prediction ? "Churn" : "No Churn"}
                      </div>
                      <div className="col-md-6">
                        <strong>Churn Probability:</strong> {(result.probability_of_churn * 100).toFixed(2)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {!result && (
                <div className="alert alert-info mt-4" role="alert">
                  <h4 className="alert-heading">No Prediction Yet</h4>
                  <p>Submit the form to get a churn prediction.</p>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-light rounded">
            <h5>About Churn Prediction</h5>
            <p>
              Customer churn prediction helps identify customers who are likely to stop using your service.
              This allows businesses to take proactive measures to retain valuable customers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Predict;