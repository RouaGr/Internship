import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as Predict } from "./icons/predict.svg";
import { ReactComponent as PredictionHistory } from "./icons/history.svg";
import { ReactComponent as ImportantFeatures } from "./icons/important_features.svg";

const Sidebar = () => {
  return (
    <main>
      <div
        className="d-flex flex-column flex-shrink-0 p-3 bg-light"
        style={{ width: "280px", height: "1300px" }}
      >
        <span className="fs-4">Churn App</span>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link active" aria-current="page">
              <HomeIcon className="me-2" width={16} height={16} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/predict" className="nav-link link-dark">
              <Predict className="me-2" width={16} height={16} />
              Predict
            </Link>
          </li>
          <li>
            <Link to="/history" className="nav-link link-dark">
              <PredictionHistory className="me-2" width={16} height={16} />
              Prediction History
            </Link>
          </li>
          <li>
            <Link to="/features" className="nav-link link-dark">
              <ImportantFeatures className="me-2" width={16} height={16} />
              Important Features
            </Link>
          </li>
        </ul>
      </div>

      <div className="b-example-divider"></div>
    </main>
  );
};

export default Sidebar;
