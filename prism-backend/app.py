
from flask import Flask, request, jsonify
import os
import requests
try:
    from groq import Groq
    groq_available = True
except ImportError:
    groq_available = False
from flask_cors import CORS
import joblib
import numpy as np
import pandas as pd
# Load .env if present
try:
    from dotenv import load_dotenv
    load_dotenv()
except ImportError:
    pass

# 1. Load Model, Encoder, and Features
model = joblib.load("rf_model.pkl")
label_encoder = joblib.load("label_encoder.pkl")
final_features = joblib.load("final_features.pkl")  # List of features

# 2. Flask App Setup
app = Flask(__name__)
# Robust CORS: allow all methods/headers for local frontend (http://localhost:8080)
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}}, supports_credentials=True)

# Helper: check internet connectivity
def has_internet():
    try:
        requests.get("https://www.google.com", timeout=2)
        return True
    except Exception:
        return False

# Helper: get Groq API key from env
def get_groq_api_key():
    return os.environ.get("GROQ_API_KEY")

# 5. Groq Insight Endpoint
@app.route('/groq-insight', methods=['POST'])
def groq_insight():
    print("/groq-insight called")
    if not groq_available:
        print("Groq SDK not available")
        return jsonify({"error": "Groq SDK not installed on server."}), 500
    if not has_internet():
        print("No internet connection detected")
        return jsonify({"insight": None, "offline": True, "message": "No internet connection. Insight unavailable."})
    data = request.json or {}
    print("Request data:", data)
    answers = data.get("answers", {})
    prediction = data.get("prediction", {})
    prompt = f"""
            Based on the user's stress assessment answers: {answers}  
            and predicted stress level: {prediction},  

            Generate a **two-part** coping strategy that includes:  

            1. **Immediate Relief** (2-3 sentences):  
            - A science-backed technique for instant stress reduction  
            - Specific instructions (e.g., duration, steps)  

            2. **Long-Term Resilience** (3-5 sentences):  
            - An evidence-based habit or training method  
            - Timeframe for results (e.g., "within 3 weeks")  
            - Neuroplasticity/growth mindset explanation  

            3. **Empowering Framing** (2 sentences):  
            - Reframe stress as adaptability  
            - End with a call-to-action  

            **Requirements:**  
            - Use second-person ("you/your") for personalization  
            - Cite research briefly (e.g., "Harvard studies show...")  
            - Keep total response to 5-7 sentences max  
            - Avoid jargon; focus on actionable steps  
            - Balance validation ("This is normal...") with empowerment ("You can...")  

            **Tone:** Supportive, scientific but conversational, and slightly motivational.  
            """
    
    try:
        print("Instantiating Groq client...")
        client = Groq()  # API key is picked up from env
        print("Calling Groq chat.completions.create...")
        chat_completion = client.chat.completions.create(
            messages=[
                {"role": "system", "content": "You are a helpful mental health assistant."},
                {"role": "user", "content": prompt}
            ],
            model="llama-3.3-70b-versatile"
        )
        print("Groq response received:", chat_completion)
        content = chat_completion.choices[0].message.content
        print("Groq content:", content)
        return jsonify({"insight": content, "offline": False})
    except Exception as e:
        import traceback
        print("Groq exception:", str(e))
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Stress Prediction API is running!"

# 3. Predict Endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data
        data = request.json
        
        # Convert to DataFrame with correct feature order
        input_df = pd.DataFrame([data])
        input_df = input_df.reindex(columns=final_features, fill_value=0)

        # Predict
        prediction = model.predict(input_df)
        prediction_label = label_encoder.inverse_transform(prediction)[0]

        # Print all possible outputs from the model
        print("Required features:", final_features)
        print("\n\n\n\n\n\n\n\n---")
        print("\n--- Prediction Request ---")
        print("Input DataFrame:\n", input_df.to_string(index=False))
        print("Raw Prediction:", prediction)
        print("Prediction Label:", prediction_label)
        # Print probabilities if available
        if hasattr(model, "predict_proba"):
            try:
                proba = model.predict_proba(input_df)
                print("Prediction Probabilities:", proba)
            except Exception as e:
                print("Could not compute predict_proba:", e)
        # Print feature importances if available
        if hasattr(model, "feature_importances_"):
            print("Feature Importances:", model.feature_importances_)
        # Print all attributes of the prediction result
        print("Prediction type:", type(prediction))
        print("Prediction dir:", dir(prediction))
        print("--- End of Request ---\n")

        return jsonify({"prediction": prediction_label})
    
    except Exception as e:
        return jsonify({"error": str(e)})



# --- Email Results Endpoint ---
from flask import make_response

@app.route('/send-results-email', methods=['POST', 'OPTIONS'])
def send_results_email():
    if request.method == 'OPTIONS':
        response = make_response('', 200)
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:8080'
        response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        response.headers['Access-Control-Allow-Credentials'] = 'true'
        return response

    SENDGRID_API_KEY = os.getenv("SENDGRID_API_KEY")
    FROM_EMAIL = os.getenv("FROM_EMAIL", "ryu.mendoza.23@usjr.edu.ph")  # Email address used for sending
    FROM_NAME = "Grex Suvamenta - PRISM"
    REPLY_TO = "ryu.mendoza.23@usjr.edu.ph"  # Reply-to address for the email
    data = request.get_json()
    user_email = data.get('email')
    answers = data.get('answers')
    prediction = data.get('prediction')
    insight = data.get('insight')
    if not (user_email and answers and prediction):
        return jsonify({"error": "Missing required fields"}), 400

    # Build answers section: question plain, answer bold, on new line
    answers_section = ""
    for question, answer in answers.items():
        answers_section += f"{question}:<br><b>{answer}</b><br><br>"

    subject = "Your Stress Assessment Results"
    html_content = f"""
    <h2>Your Stress Assessment Results</h2>
    {answers_section}
    <b>Prediction:</b> {prediction.get('stressLevel', '-')}
    <br><br><b>Insight:</b><br>{insight if insight else prediction.get('insight', '')}
    <hr><small>This email was sent by MindMeld.</small>
    """

    # Send email via SendGrid API
    if not SENDGRID_API_KEY:
        return jsonify({"error": "SendGrid API key not configured"}), 500
    sg_url = "https://api.sendgrid.com/v3/mail/send"
    payload = {
        "personalizations": [
            {"to": [{"email": user_email}]}
        ],
        "from": {"email": FROM_EMAIL, "name": FROM_NAME},
        "reply_to": {"email": REPLY_TO},  # Adding reply-to address
        "subject": subject,
        "content": [
            {"type": "text/html", "value": html_content}
        ]
    }
    headers = {
        "Authorization": f"Bearer {SENDGRID_API_KEY}",
        "Content-Type": "application/json"
    }
    resp = requests.post(sg_url, headers=headers, json=payload)
    if resp.status_code >= 200 and resp.status_code < 300:
        return jsonify({"success": True})
    else:
        return jsonify({"error": "Failed to send email", "details": resp.text}), 500

# 4. Run the App
if __name__ == "__main__":
    print(app.url_map)
    app.run(debug=True)
