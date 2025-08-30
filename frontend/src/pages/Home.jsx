import React from "react";

const Home = () => {
  return (
    <div className="text-center mt-5">
      <h1 className="display-4 fw-bold">Welcome to Churn App</h1>
      <p className="lead mt-3">
        This application helps you predict customer churn, analyze important
        features, and review prediction history.
      </p>

      <div className="d-flex justify-content-center gap-3 mt-4">
        <a href="/predict" className="btn btn-primary btn-lg">
          Start Prediction
        </a>
        <a href="/features" className="btn btn-outline-secondary btn-lg">
          Explore Features
        </a>
      </div>
    </div>
  );
};

export default Home;