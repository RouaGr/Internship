import { NavLink } from "react-router-dom";
import { ReactComponent as HomeIcon } from "./icons/home.svg";
import { ReactComponent as Predict } from "./icons/predict.svg";
import { ReactComponent as PredictionHistory } from "./icons/history.svg";
import { ReactComponent as ImportantFeatures } from "./icons/important_features.svg";

const Sidebar = () => {
  return (
    <main>
      <div
        className="d-flex flex-column flex-shrink-0 p-3"
        style={{ width: "280px", height: "100%" }}
      >
        <span className="fs-4">Churn App</span>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "link-dark")
              }
            >
              <HomeIcon className="me-2" width={16} height={16} />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/predict"
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "link-dark")
              }
            >
              <Predict className="me-2" width={16} height={16} />
              Predict
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "link-dark")
              }
            >
              <PredictionHistory className="me-2" width={16} height={16} />
              Prediction History
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/features"
              className={({ isActive }) =>
                "nav-link " + (isActive ? "active" : "link-dark")
              }
            >
              <ImportantFeatures className="me-2" width={16} height={16} />
              Important Features
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="b-example-divider"></div>
    </main>
  );
};

export default Sidebar;