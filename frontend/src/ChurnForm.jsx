import React, { useState } from 'react';
import axios from 'axios';

const ChurnForm = () => {
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
    RoamMins: 12
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://127.0.0.1:8000/predict', form);
      setResult(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Churn Prediction</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(form).map(([key, val]) => (
          <div key={key}>
            <label>{key}</label>
            <input
              type="number"
              name={key}
              value={val}
              onChange={handleChange}
              step="any"
            />
          </div>
        ))}
        <button type="submit">Predict</button>
      </form>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <strong>Prediction:</strong> {result.prediction} <br />
          {typeof result.probability_churn !== 'undefined' && (
            <span><strong>Probability:</strong> {result.probability_churn}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default ChurnForm;
