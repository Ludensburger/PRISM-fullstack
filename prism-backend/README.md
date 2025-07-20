# PRISM Backend

**Psychological Response Inference via Stress Modeling – Backend**

## Overview

This is the backend for the PRISM platform, built with Python and Flask. It provides machine learning-powered stress prediction, LLM-based insights, and transactional email services for the frontend.

---

## Main Endpoints (API Routes)

| Endpoint              | Method | Description                                                                          |
| --------------------- | ------ | ------------------------------------------------------------------------------------ |
| `/predict`            | POST   | Receives quiz answers, returns stress prediction and model details.                  |
| `/llm-insight`        | POST   | Sends quiz answers and prediction, returns LLM-generated coping strategies/insights. |
| `/send-results-email` | POST   | Sends the user's answers, prediction, and insights to their email via SendGrid.      |
| `/`                   | GET    | Health check or welcome endpoint.                                                    |

---

## Features

- Predicts student stress levels using a trained Random Forest model
- Balances data using SMOTENC for fairer predictions
- Integrates with Groq LLM for personalized coping strategies
- Sends results to users via email (SendGrid)
- CORS enabled for frontend-backend communication

---

## Setup & Installation

### Prerequisites

- Python 3.10.x recommended

### Install & Run

```bash
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Create a .env file with your API keys and sender email:
# SENDGRID_API_KEY=your_sendgrid_key
# GROQ_API_KEY=your_groq_api_key
# FROM_EMAIL=your_sender_email@example.com
python app.py
```

- The backend will run on http://127.0.0.1:5000

---

## Usage

- POST to `/predict` with quiz answers to get a stress prediction
- POST to `/llm-insight` for LLM-powered coping strategies
- POST to `/send-results-email` to email results to a user

---

## Authors

Robien Lee Tan, Jamal Robert Suba, Ryu Mendoza, Percy Valencia

---

## License

MIT# **Stress Level Prediction Backend (Flask)**

This backend serves our trained **Random Forest model** via a Flask API. It accepts user inputs (survey responses) and returns the predicted **stress level**.

---

## **Setup Instructions**

### **1. Extract the Project**

Simply unzip the provided project folder.

---

### **2. Create a Virtual Environment**

(Recommended to avoid version conflicts)

```bash
python -m venv venv
```

Activate the virtual environment:

- **Windows:**
  ```bash
  venv\Scripts\activate
  ```
- **Mac/Linux:**
  ```bash
  source venv/bin/activate
  ```

---

### **3. Install Requirements**

Install all dependencies:

```bash
pip install -r requirements.txt
```

---

### **4. Start the Flask Server**

Run the backend server:

```bash
python app.py
```

By default, it runs at:

```
http://127.0.0.1:5000
```

---

## **API Usage**

### **Endpoint: `/predict`**

**Method:** `POST`  
**Content-Type:** `application/json`

**Sample Request (via Postman or cURL):**

```json
{
  "Working Student:": "Yes",
  "Studying Home": 1,
  "Studying Dorm": 0,
  "Studying Cafe": 0,
  "Studying Other": 0,
  "Do you consider yourself more of an introvert or an extrovert?": "Introvert",
  "How do you usually cope with stress?": "Listening to music",
  "Commute time (one way): ___ minutes": 30,
  "Felt nervous and \"stressed\"?": 4,
  "Been upset because of something that happened unexpectedly?": 3,
  "About how often did you feel tired out for no good reason?": 2
}
```

**Sample Response:**

```json
{
  "prediction": "High Stress"
}
```

---

## **SMOTE & Model Explanation**

1. **Why SMOTE?**

   - Our dataset was imbalanced (more "High Stress" than "Moderate Stress").
   - We applied **SMOTENC** (for mixed categorical & numeric data) on the **training set only** to balance the classes.

2. **Why Random Forest?**
   - Chosen due to its robustness, ability to handle mixed data, and its strong performance during model evaluation.
   - Recommended by the professor and confirmed by cross-validation performance.

---

## **Testing the API**

- Use **Postman** or **cURL**:
  ```bash
  curl -X POST http://127.0.0.1:5000/predict   -H "Content-Type: application/json"   -d '{"Working Student:": "Yes", "Studying Home": 1, ...}'
  ```
