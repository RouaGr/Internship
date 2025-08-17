import React, { useState, useEffect } from 'react';
import ChurnForm from './ChurnForm';
import FeatureImportanceChart from './FeatureImportanceChart';
import axios from 'axios';
import PredictionChart from './PredictionChart';


function App() {
  const [labels, setLabels] = useState([]);
  const [importances, setImportances] = useState([]);
  const [showFeatures, setShowFeatures] = useState(false);
  const [predictionData, setPredictionData] = useState({});
  
  const handleReset = () => {
    axios.delete('http://127.0.0.1:8000/reset-history')
      .then(() => {
        // Clear chart data on success
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
    <div className="App">
      <h1>Churn Prediction Dashboard</h1>
      <ChurnForm />
      <h2>Prediction History</h2>
      <PredictionChart data={predictionData} />
      <button onClick={handleReset} style={{ marginTop: '10px' }}>
        Reset Prediction History
      </button>
      <h2>Feature Importance</h2>
      <button onClick={() => setShowFeatures(!showFeatures)}>
        {showFeatures ? "Hide Feature Importance" : "Show Feature Importance"}
      </button>
      {showFeatures && (
        <FeatureImportanceChart labels={labels} importances={importances} />
      )}
    </div>
  );
}

export default App;
