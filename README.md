# 🩺 Health Companion

A simple health companion web app built with **React + Express**.  
It helps users perform quick consultations based on symptoms, receive advice, see tailored warnings, explore relief options, and keep a history of past consultations.

---

## 🚀 Features
- **Symptom Consultation**: Users can input symptoms, age, and medical history.
- **AI/Rule-Based Engine**: Provides advice, relief options, and confidence scores.
- **Tailored Warnings**: Adjusts based on user’s age and medical history.
- **Results Persistence**: Consultations are stored and can be viewed later.
- **History Tracking**: Users can revisit their consultation sessions.
- **Relief Selection**: Track remedies you’ve chosen from the suggestions.

---

## 🛠 Tech Stack
- **Frontend**: React, TailwindCSS  
- **Backend**: Node.js, Express  
- **Storage**: In-memory (no database yet — MVP phase)  
- **Deployment**: Vercel (Frontend) + (Backend planned for Node hosting or Vercel functions)

---

## 📦 Setup

### 1. Clone the repository
```bash
git clone https://github.com/AdahJerrie/health-companion.git
cd health-companion
2. Install dependencies
For both frontend and backend folders:

bash
Copy
Edit
npm install
3. Run backend
bash
Copy
Edit
cd backend
npm start
Backend runs at: http://localhost:5000

4. Run frontend
bash
Copy
Edit
cd frontend
npm run dev
Frontend runs at: http://localhost:5173

📊 Example Consultation Flow
Enter symptom: fever

Enter age and medical history (optional).

Get:

Advice: Drink fluids, rest...

Warning: Seek a doctor if fever persists...

Relief Options: Acetaminophen, Hydration...

Confidence Score: 0.9

Results are saved and available in the Results or History pages.

🗺 Roadmap
✅ MVP with consultations, results, history

⏳ Add persistent database (MongoDB/Postgres)

⏳ Expand knowledge base of conditions

⏳ Authentication (users can log in to save sessions)

⏳ AI-enhanced reasoning engine

🤝 Contribution
This project started as a learning + building journey.
Feel free to fork, suggest improvements, or open PRs!

📜 License
MIT License