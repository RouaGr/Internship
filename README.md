# Project Overview
This Project is part of my internship at YottaByte
It invloves building a predictive analytics platform that :
- Trains and deploys a Machine Learning Model for customer churn prediction
- Provides a REST API using FastAPI
- Displays results in an interactive React frontend

# Tech Stack 
Backend: FastAPI(Python), Joblib, NumPy, Pandas
Frontend: React, Chart.js, Axios
ML Model: RandomForestClassifier (best performing on churn dataset)

# Installation 

## Clone the repository 
git clone https://github.com/RouaGr/Internship.git
cd Internship

## Backend Setup (FastAPI)
cd backend 
python3 -m venv venv
source venv/bin/activate
pip installl -r requirements.txt
uvicorn app_churn:app --reload

## Frontend Setup (React)
cd ../frontend
npm install
npm start 
