# 🧠 Stress Prediction Model: Feature Selection, SMOTE, and Random Forest

## ✅ Objective
The goal of this activity was to predict stress levels (**High** vs **Moderate**) using survey-based features.  
Our dataset was **imbalanced**, with most participants classified as High Stress.  
This creates bias in model training.

---

## ⚠️ Why Handle Imbalanced Data?
An imbalanced dataset can cause:
- The model to **always predict the majority class** (High Stress).
- Poor recall and F1 score for the minority class (Moderate Stress).

**Example (Before SMOTE):**
- Accuracy looks good (>90%), but **Moderate Stress has F1 = 0.00**.

---

## 🔍 How We Fixed It: SMOTE

### What is SMOTE?
SMOTE (Synthetic Minority Oversampling Technique) generates synthetic samples of the minority class **only in the training set**, so the model sees a balanced distribution without changing the test set.

---

### ✅ Why SMOTENC instead of regular SMOTE?
- Our dataset contains **both numerical and categorical features**.
- **SMOTE** works only for continuous numeric features.
- **SMOTENC (SMOTE for Nominal and Continuous)** supports:
  - Numeric features (PSS-10, K10 scores, commute time, etc.)
  - Categorical features (e.g., Working Student, Coping Mechanism)

---

### 🧐 Why We Applied SMOTE Only on Training Set
- Avoids **data leakage**.
- Keeps test set **true to real-world distribution** for evaluation.

**Flow:**
1. Split into `train` and `test`.
2. Apply SMOTENC **only on train set**.
3. Train models on balanced data, test on original.

---

### ❓Why Did We Also Use Regular SMOTE?
In some feature subsets (after selection), categorical features were dropped. For these cases:
- **Subset has only numeric features → regular SMOTE works.**
- **Subset includes categorical features → SMOTENC used.**

This is acceptable since the choice depends on feature types after selection.

---

## 🌲 Why Random Forest (Ensemble)
- Handles **mixed feature types** well.
- Performs **automatic feature importance** ranking.
- Resistant to **overfitting** compared to single decision trees.
- Recommended by our professor as a strong baseline model for classification.

---

## ✅ Implementation Summary
### Feature Selection Approaches:
- RFE with Logistic Regression
- RFE with Random Forest
- Chi-Square Test
- Big Five Features (manual domain selection)
- All Features

### Models Trained:
- RandomForestClassifier for all feature subsets.

### Evaluation Metrics:
- Accuracy, Confusion Matrix, Classification Report (Precision, Recall, F1-score).

---

## 🔍 Key Results
- Without SMOTE → Model predicts mostly High Stress (minority ignored).
- With SMOTE → Moderate Stress recall and F1 improve significantly.
- Visual comparison (F1 score before vs after SMOTE) shows effectiveness.

---

## 📌 Notes
- SMOTE and SMOTENC were used **only on the training set**.
- Testing remained on the original distribution for realistic evaluation.
- Balanced training helps avoid bias toward the majority class.

---

## ✅ Recommended Next Steps
- Perform **cross-validation** to confirm robustness.
- Compare with other classifiers (Logistic Regression, XGBoost).
- Add **visualizations** (feature importance, confusion matrices).
