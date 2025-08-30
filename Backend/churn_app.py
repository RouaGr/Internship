from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np

prediction_history = []
churn_count = 0
no_churn_count = 0

feature_names = [
    "AccountWeeks", "ContractRenewal", "DataPlan", "DataUsage",
    "CustServCalls", "DayMins", "DayCalls", "MonthlyCharge", 
    "OverageFee", "RoamMins"
]

model = joblib.load("../Model_processing/model_churn.pkl")
app = FastAPI(title="Churn Prediction API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        return {"features": feature_names, "importances": importances}
    return {"error": "Model does not support feature importances"}

@app.post("/predict")
def predict_churn(data: CustomerData):
    global churn_count, no_churn_count
    
    input_data = np.array([[
        data.AccountWeeks, data.ContractRenewal, data.DataPlan,
        data.DataUsage, data.CustServCalls, data.DayMins,
        data.DayCalls, data.MonthlyCharge, data.OverageFee, data.RoamMins
    ]])
    
    data_dict = dict(zip(feature_names, input_data[0]))
    prediction = model.predict(input_data)[0]
    
    if prediction == 1:
        churn_count += 1
    else:
        no_churn_count += 1
        
    proba = round(model.predict_proba(input_data)[0][1], 3)
    result = "Churn" if prediction == 1 else "No Churn"
    
    data_dict["prediction"] = result
    data_dict["probability_of_churn"] = proba
    prediction_history.append(data_dict)

    return {"prediction": result, "probability_of_churn": proba, "data": data_dict}

@app.get("/prediction-history")
def get_prediction_summary():
    return {
        "prediction_history": prediction_history,
        "Churn": churn_count,
        "No Churn": no_churn_count
    }

@app.delete("/reset-history")
def reset_prediction_history():
    global churn_count, no_churn_count
    prediction_history.clear()
    churn_count = 0
    no_churn_count = 0
    return {"message": "Prediction history cleared."}