# 🌱 SmartAgro – AI-Powered Crop Recommendation System

## 📖 Overview

SmartAgro is an **AI-driven crop recommendation system** that helps farmers and researchers identify the most suitable crop for cultivation based on soil nutrients (NPK values), climatic conditions (temperature, humidity, rainfall), and geographic location.

The project combines a **Next.js frontend** with an integrated **Python machine learning model** (trained using scikit-learn). Users can input their **state, season, and previous crop**, and receive personalized crop recommendations powered by data and AI.

---

## 🛠 Tech Stack

### Frontend

* **Next.js 13+ (App Router)** – React framework
* **TypeScript** – Strongly typed code
* **Tailwind CSS** – Styling
* **shadcn/ui** – Prebuilt UI components
* **lucide-react** – Icons

### Backend (API)

* **Next.js API Routes** – For handling requests
* **Node.js Child Process** – To run Python scripts from Next.js

### Machine Learning (Python)

* **Python 3.12**
* **pandas** – Data processing
* **scikit-learn** – Machine learning (DecisionTreeClassifier / RandomForestClassifier)
* **joblib** – Model persistence (`crop_model.pkl`)
* **Custom modules**:
  * `mainfn.py` – Entry point for recommendations
  * `rec_model.py` – Loads ML model
  * `weather.py` – Provides state-wise weather data
  * `datasets/` – Contains NPK values dataset
  * `models/` – Contains trained ML model

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/smartagro-app.git
cd smartagro-app
```

### 2. Install dependencies

```bash
# Using npm
npm install

# or using pnpm
pnpm install
```

### 3. Python environment setup

Install dependencies:

```bash
pip install pandas scikit-learn joblib
```

Ensure your trained model (`crop_model.pkl`) exists in:

```
app/predict/models/crop_model.pkl
```

### 4. Run the development server

```bash
npm run dev
```

Visit **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## ✨ Features

* 🌍 **State Selection** – Choose from all Indian states
* 🌦 **Climate Integration** – Fetches temperature, humidity, and rainfall for the state
* 🌱 **NPK-Based Recommendation** – Uses soil nutrient dataset
* 🤖 **AI-Powered Predictions** – Trained ML model suggests the best crop
* 📊 **Data Display** – Shows NPK values and climate data before recommendation
* ⚡ **Full-Stack Integration** – Next.js frontend + Python backend working seamlessly

---

## 🔄 Technical Workflow

1. *User Input* – User provides inputs such as *state, season, previous crop, and optionally **plant images* (for disease identification).

2. *Frontend (Next.js)* – Handles UI for crop, disease, and fertilizer modules. Sends requests to API routes when the user triggers predictions or uploads images.

3. *API Routes* – Each feature has its own API endpoint (e.g., /api/recommend-crop, /api/disease-detect, /api/recommend-fertilizer). The API routes act as a bridge between the frontend and Python ML models.

4. *Python ML Scripts* –

   * mainfn.py: Handles *crop recommendation* using climate + NPK data + ML model.
   * disease_model.py (or equivalent): Handles *disease identification* by processing plant images and classifying diseases.
   * fertilizer.py: Handles *fertilizer recommendation* based on soil nutrient imbalance.

5. *Data Sources* –

   * *Datasets*: datasets/state_wise_npk_values.csv for soil data
   * *Models*: crop_model.pkl for crop prediction, additional models for disease and fertilizer tasks

6. *Recommendation Engine* – Each Python module returns structured results (predicted crop, disease status, fertilizer advice).

7. *API Response → Frontend* – Results are sent back as JSON and displayed dynamically on the frontend UI.
---

## 🚀 Future Enhancements

* 📊 Dashboard for multiple crop comparisons
* 💾 Persistent storage of user queries and results
* 📱 Mobile-friendly UI and Voice assistance
* 🌐 Real-time weather API integration

---

