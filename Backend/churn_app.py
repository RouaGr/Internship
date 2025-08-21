# app_churn.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np



prediction_history =[]

# Load model
model = joblib.load("../Model_processing/model_churn.pkl")
print(model)

# Define the API
app = FastAPI(title="Churn Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Define expected input format
class CustomerData(BaseModel):
    AccountWeeks: int
    ContractRenewal: int
    DataPlan: int
    DataUsage: float
    CustServCalls: int
    DayMins: float
    DayCalls: int
    MonthlyCharge: float
    OverageFee: float
    RoamMins: float



@app.get("/feature-importance")
def get_feature_importance():
    if hasattr(model, "feature_importances_"):
        importances = model.feature_importances_.tolist()
        feature_names = [
            "AccountWeeks", "ContractRenewal", "DataPlan", "DataUsage",
            "CustServCalls", "DayMins", "DayCalls", "MonthlyCharge", "OverageFee", "RoamMins"
        ]
        return {"features": feature_names, "importances": importances}
    return {"error": "Model does not support feature importances"}



@app.post("/predict")
def predict_churn(data: CustomerData):
    # Convert input to array
    input_data = np.array([[
        data.AccountWeeks,
        data.ContractRenewal,
        data.DataPlan,
        data.DataUsage,
        data.CustServCalls,
        data.DayMins,
        data.DayCalls,
        data.MonthlyCharge,
        data.OverageFee,
        data.RoamMins
    ]])

    # Predict
    prediction = model.predict(input_data)[0]
    proba = model.predict_proba(input_data)[0][1]
    result = "Churn" if prediction == 1 else "No Churn"

    prediction_history.append(result)

    return {"prediction": result,"probability_of_churn":round(proba,3)}


@app.get("/prediction-history")
def get_prediction_summary():
    churn_count = prediction_history.count("Churn")
    no_churn_count = prediction_history.count("No Churn")
    return {"Churn": churn_count, "No Churn": no_churn_count}

@app.delete("/reset-history")
def reset_prediction_history():
    prediction_history.clear()
    return {"message": "Prediction history cleared."}