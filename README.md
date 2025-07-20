# PRISM

**Psychological Response Inference via Stress Modeling**

## Introduction

Stress among students is a growing concern in academic institutions, as it directly affects mental health, academic performance, and overall well-being. Factors such as academic workload, poor sleep, long commute times, and inadequate coping mechanisms often intensify stress levels, potentially leading to burnout or severe psychological issues. While traditional scales like the Perceived Stress Scale (PSS-10) and the Kessler Psychological Distress Scale (K10) are effective, they require manual interpretation, limiting their scalability. With the growing availability of data and machine learning tools, automated stress prediction systems offer a promising solution for early intervention.

Recent studies demonstrate the potential of machine learning in predicting psychological stress. Li et al. (2023) highlighted the effectiveness of Support Vector Machines and Logistic Regression, with Python being the most commonly used tool. Ding et al. (2023) introduced a hybrid ensemble of Random Forest and Gradient Boosting Machines using soft voting, achieving perfect accuracy on small datasets. Similarly, Kene and Thakare (2023) employed gradient boosting to outperform models like KNN and SVM in stress classification using the PhysioBank dataset.

However, many existing models rely solely on questionnaire or physiological data, overlooking behavioral and environmental factors like device usage, commuting patterns, and personality traits. Additionally, imbalanced datasets—with high-stress samples dominating—lead to biased models with limited generalizability. Although ensemble methods improve performance, few studies use advanced balancing techniques like SMOTENC that handle mixed data types effectively. Many approaches also remain as prototypes, rarely advancing to deployable systems.

This project addresses these gaps by developing a stress-level prediction model using Random Forest and SMOTENC for fair handling of categorical and continuous features. The dataset, collected from 67 students, includes PSS-10 and K10 responses, demographic data (age, year level, commute time), and behavioral indicators (coping mechanisms, social activity). The model is deployed as a Flask-based web API, enabling real-time stress level predictions. This practical tool supports institutions in identifying and assisting students at risk of high stress.

---

## Features

- **Automated Stress Prediction**: Predicts student stress levels using a Random Forest model trained on a balanced dataset (SMOTENC).
- **Behavioral & Demographic Insights**: Considers not just psychometric scales but also lifestyle, coping, and environmental factors.
- **LLM-Powered Coping Strategies**: Integrates a large language model (Groq) to generate personalized coping insights.
- **Email Results**: Users can email themselves a summary of their answers, prediction, and LLM-generated insights.
- **Inspiration Page**: Search and discover famous people with similar traits, stress patterns, and achievements.
- **Modern UI**: Built with React, Tailwind, and a custom component library for a beautiful, responsive experience.

---

## Tech Stack

- **Backend**: Python, Flask, scikit-learn, pandas, SendGrid, python-dotenv, Flask-CORS
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **ML/AI**: Random Forest, SMOTENC, OpenAI/Groq LLM API
- **Email**: SendGrid transactional email

---

## Setup & Installation

### Prerequisites

- Python 3.9+
- Node.js 18+/Bun (for frontend)
- (Recommended) Virtualenv or Conda for Python

### 1. Backend Setup (Flask)

```bash
# Recommended: Use Python 3.10.x for best compatibility
cd prism-backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Create a .env file with your SendGrid API key, Groq API key, and sender email:
# SENDGRID_API_KEY=your_sendgrid_key
# GROQ_API_KEY=your_groq_api_key
# FROM_EMAIL=your_sender_email@example.com
python app.py
```

- The backend will run on http://127.0.0.1:5000

### 2. Frontend Setup (React)

```bash
cd prism-frontend-react
bun install # or npm install
bun run dev # or npm run dev
```

- The frontend will run on http://localhost:8080

---

## Usage

- Visit the frontend in your browser.
- Take the stress assessment quiz.
- View your predicted stress level and LLM-powered coping strategies.
- Email yourself the results (answers, prediction, and insights).
- Explore the Inspiration page to find famous people with similar traits.

---

## Methodology

### Data Source and Acquisition

The dataset was collected from 66 university students via Google Forms, covering:

- Demographic data (work status, sleep, commute, study environment, devices)
- PSS-10 (Perceived Stress Scale)
- K10 (Kessler Psychological Distress Scale)
- Behavioral tendencies (coping, personality, social activity, self-reported stress)

### Data Preprocessing

- One-hot encoding for categorical variables
- Discretization of continuous variables
- SMOTENC for class balancing

### Feature Selection

- Recursive Feature Elimination (RFE)
- Chi-Square Test (SelectKBest)
- Big Five Factors approach

### Modeling

- Random Forest Classifier
- Train-test split (75%-25%)
- SMOTENC applied to training data only
- Metrics: accuracy, precision, recall, F1-score, confusion matrix

### Results & Discussion

- High accuracy, but caution due to class imbalance and small test set
- High precision for moderate stress, but more data needed for high stress
- Model is a strong starting point for further research and deployment

---

## Authors

Robien Lee Tan, Jamal Robert Suba, Ryu Mendoza, Percy Valencia
