import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-BrowserRouter-dom";
import Predict from './pages/Predict';
import ImportantFeatures from './pages/ImportantFeatures';
import PredictionChart from './PredictionChart';
import SideBar from "./Sidebar";
import axios from 'axios';

function App() {
  const [labels, setLabels] = useState([]);
  const [importances, setImportances] = useState([]);
  const [predictionData, setPredictionData] = useState({});

  const handleReset = () => {
    axios.delete('http://127.0.0.1:8000/reset-history')
      .then(() => {
        setPredictionData({ "Churn": 0, "No Churn": 0 });
      })
      .catch(console.error);
  };

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/feature-importance')
      .then((res) => {
        setLabels(res.data.features);
        setImportances(res.data.importances);
      })
      .catch(console.error);

    axios.get('http://127.0.0.1:8000/prediction-history')
      .then(res => setPredictionData(res.data))
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <div className="d-flex">
        <div className='col-3'>
          <SideBar />
        </div>
        <div className='col-9 p-3'>
          <Routes>
            <Route path="/" element={<div>Welcome to Churn App</div>} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/history" element={
              <div>
                <h2>Prediction History</h2>
                <PredictionChart data={predictionData} />
                <button onClick={handleReset} style={{ marginTop: '10px' }}>
                  Reset Prediction History
                </button>
              </div>
            } />
            <Route path="/features" element={
              <div>
                <h2>Feature Importance</h2>
                <ImportantFeatures labels={labels} importances={importances} />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
