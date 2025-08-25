# 🩺 Health Companion
A simple AI-assisted health consultation app that helps users log symptoms, receive tailored advice, and track their consultation history.  
Built with **React (frontend)** and **Express.js (backend)**.
---
## 🚀 Features
- **Symptom Consultation**  
  Enter symptoms, age, and medical history to receive:
  - Tailored advice
  - Confidence score
  - Context-aware warnings
  - Relief options (OTC, home remedies, lifestyle changes)

- **Consultation Results**  
  View detailed consultation outcomes with confidence levels and safety notes.

- **History Tracking**  
  Access past consultations and add relief actions to track your wellness journey.

- **AI / Rules Engine**  
  - Knowledge base of common conditions (headache, fever, cough, etc.)  
  - Rule-based personalization (e.g., age, medical conditions)  
  - Confidence scoring and tailored warnings  
---





## ⚙️ Setup

 1. Clone the repository

git clone https://github.com/yourusername/health-companion.git
cd health-companion

2. Backend Setup
bash
Copy
Edit
cd backend
npm install
npm start
Runs the backend API at:
👉 http://localhost:5000

3. Frontend Setup
bash
Copy
Edit
cd frontend
npm install
npm run dev
Runs the React app at:
👉 http://localhost:5173 (Vite default)


📖 Usage
Open the app in your browser.

Navigate to the Consultation page.

Enter your symptom, age, and optional medical history.

Submit to receive tailored advice, warnings, and relief suggestions.

View results in the Results section.

Revisit past consultations in the History page.

🛠 Tech Stack
Frontend: React + Vite + TailwindCSS

Backend: Node.js + Express.js

Storage: In-memory (demo purpose, no database yet)

✅ Current Status
This is an MVP (Minimum Viable Product):

Basic rule-based AI engine

Consultation, results, and history fully wired

Ready for GitHub deployment and hosting (Vercel + backend service)

