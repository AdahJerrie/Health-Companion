# 🩺 Health Companion

> **An AI-assisted health consultation and wellness tracking platform built with React and Express.js.**

Health Companion is a full-stack web application designed to help users describe common symptoms, receive context-aware health guidance, understand relevant warnings, explore relief options, and review their consultation history.

The application combines a **React + Vite frontend** with a lightweight **Express.js REST API** and a rule-based health knowledge engine. The current implementation is an MVP focused on demonstrating the architecture and user experience of an intelligent health consultation workflow.

> **Important:** Health Companion is a software prototype and educational project. It is **not a medical diagnostic system** and should not be used as a substitute for professional medical advice, diagnosis, or treatment.

---

## ✨ Features

### Symptom Consultation

Users can provide:

* Symptom
* Age
* Relevant medical history

The backend evaluates the information against its health knowledge base and returns:

* General health advice
* Confidence score
* Context-aware warnings
* Suggested relief options
* Consultation/session ID

### 🧠 Rule-Based Health Engine

The backend currently uses a structured knowledge base for common symptoms including:

* Headache
* Fever
* Cough

The engine provides a baseline response and then applies additional rules based on user context.

For example:

* Users above a certain age receive additional warnings.
* Fever combined with diabetes produces an additional monitoring warning.
* Cough combined with asthma produces an additional medical-evaluation warning.

This creates a simple form of **context-aware personalization** without relying on a large language model.

### 📋 Consultation Results

Each consultation produces a structured result containing:

```json
{
  "advice": "Take rest, stay hydrated...",
  "warning": "See a doctor if headaches persist or worsen.",
  "reliefOptions": [],
  "confidence": 0.9,
  "sessionId": 1
}
```

### 📚 Consultation History

Users can:

* View previous consultations
* Retrieve individual consultation results
* Add selected relief actions to a consultation
* Clear consultation history

### 🎨 Responsive Frontend

The frontend is built with React and Vite and uses Tailwind CSS for styling.

The application uses React Router for client-side navigation and Framer Motion for interface animations.

---

# 🏗️ Architecture

Health Companion follows a simple client-server architecture:

```text
                    ┌──────────────────────────┐
                    │        User / Browser    │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │   React + Vite Frontend  │
                    │                          │
                    │  - Consultation UI       │
                    │  - Results               │
                    │  - History               │
                    │  - Navigation            │
                    └────────────┬─────────────┘
                                 │
                         HTTP / REST API
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    Express.js Backend    │
                    │                          │
                    │  - API Routes            │
                    │  - Validation            │
                    │  - Health Engine         │
                    │  - Personalization       │
                    │  - Session Management    │
                    └────────────┬─────────────┘
                                 │
                                 ▼
                    ┌──────────────────────────┐
                    │    In-Memory Storage     │
                    │                          │
                    │  chatHistory             │
                    │  resultsStore            │
                    └──────────────────────────┘
```

The frontend communicates with the backend through HTTP requests. The backend processes the consultation, applies the knowledge-base rules, stores the result in memory, and returns a structured JSON response.

---

# 🛠️ Technology Stack

## Frontend

| Technology    | Purpose                              |
| ------------- | ------------------------------------ |
| React 19      | UI development                       |
| Vite 7        | Development server and build tooling |
| React Router  | Client-side routing                  |
| Tailwind CSS  | Styling                              |
| Framer Motion | UI animations                        |
| Lucide React  | Icons                                |
| ESLint        | Code quality                         |

The frontend dependencies and available scripts are defined in `health-companion-frontend/package.json`.

## Backend

| Technology                  | Purpose                    |
| --------------------------- | -------------------------- |
| Node.js                     | JavaScript runtime         |
| Express 5                   | REST API framework         |
| CORS                        | Cross-origin communication |
| Body parsing / Express JSON | Request processing         |
| Nodemon                     | Development hot reload     |

The backend package currently exposes `start` and `dev` scripts and uses Express, CORS and Nodemon.

---

# 📁 Project Structure

```text
Health-Companion/
│
├── health-companion-backend/
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── health-companion-frontend/
│   ├── public/
│   │
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── eslint.config.js
│
└── README.md
```

The repository is intentionally split into independent frontend and backend applications.

---

# 🚀 Getting Started

## Prerequisites

Make sure the following are installed:

* Node.js
* npm
* Git

Verify your installation:

```bash
node --version
npm --version
git --version
```

Node.js 18+ is recommended.

---

# 📥 Installation

Clone the repository:

```bash
git clone https://github.com/AdahJerrie/Health-Companion.git
cd Health-Companion
```

The project contains two separate Node.js applications, so dependencies must be installed independently.

---

# ⚙️ Backend Setup

Open a terminal in the backend directory:

```bash
cd health-companion-backend
```

Install dependencies:

```bash
npm install
```

Start the backend:

```bash
npm start
```

For development:

```bash
npm run dev
```

The backend starts on:

```text
http://localhost:5000
```

The server is configured to listen on port `5000`.

---

# 💻 Frontend Setup

Open a second terminal:

```bash
cd health-companion-frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Vite will provide a local URL, normally:

```text
http://localhost:5173
```

The frontend package provides separate scripts for development, production builds, previewing builds and linting.

---

# ▶️ Running the Complete Application

You need **two terminal sessions**.

### Terminal 1 — Backend

```bash
cd health-companion-backend
npm install
npm start
```

### Terminal 2 — Frontend

```bash
cd health-companion-frontend
npm install
npm run dev
```

Then open the frontend URL displayed by Vite.

The frontend communicates with the backend running on port `5000`.

---

# 🔌 API Reference

Base URL:

```text
http://localhost:5000
```

## POST `/api/consultation`

Creates a new health consultation.

### Request

```http
POST /api/consultation
Content-Type: application/json
```

### Body

```json
{
  "symptom": "headache",
  "age": 28,
  "medicalHistory": []
}
```

### Example using JavaScript

```javascript
const response = await fetch(
  "http://localhost:5000/api/consultation",
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      symptom: "headache",
      age: 28,
      medicalHistory: []
    })
  }
);

const result = await response.json();
console.log(result);
```

### Response

```json
{
  "advice": "Take rest, stay hydrated, and consider paracetamol if needed.",
  "warning": "See a doctor if headaches persist or worsen.",
  "reliefOptions": [
    {
      "name": "Paracetamol",
      "type": "OTC",
      "dosage": "500mg"
    },
    {
      "name": "Ibuprofen",
      "type": "OTC",
      "dosage": "200mg"
    }
  ],
  "confidence": 0.9,
  "sessionId": 1
}
```

The consultation endpoint normalizes the symptom, checks the knowledge base, applies contextual rules and stores the resulting session.

---

## GET `/api/results`

Returns all consultation results.

```bash
curl http://localhost:5000/api/results
```

---

## GET `/api/results/:sessionId`

Returns a specific consultation result.

Example:

```bash
curl http://localhost:5000/api/results/1
```

If the requested session does not exist, the API returns:

```json
{
  "error": "Result not found"
}
```

---

## GET `/api/history`

Returns all consultation sessions.

```bash
curl http://localhost:5000/api/history
```

---

## POST `/api/history/add`

Adds a selected relief option to a consultation session.

### Request

```http
POST /api/history/add
Content-Type: application/json
```

### Body

```json
{
  "sessionId": 1,
  "reliefItem": {
    "name": "Hydration",
    "type": "Lifestyle",
    "dosage": "Drink plenty of water"
  }
}
```

### Response

```json
{
  "success": true,
  "message": "Hydration added to history."
}
```

---

## DELETE `/api/history/clear`

Clears all consultation history.

```bash
curl -X DELETE http://localhost:5000/api/history/clear
```

Response:

```json
{
  "success": true,
  "message": "All consultation history cleared."
}
```

The available history and result endpoints are implemented directly in the Express backend.

---

# 🧠 How the Health Engine Works

The current engine is deliberately deterministic.

A consultation follows this flow:

```text
User Input
    │
    ▼
Normalize Symptom
    │
    ▼
Search Knowledge Base
    │
    ├── Match ───────► Condition-specific advice
    │
    └── No Match ────► Generic safety guidance
    │
    ▼
Apply Personalization Rules
    │
    ├── Age-related rules
    ├── Medical-history rules
    └── Condition-specific warnings
    │
    ▼
Calculate Confidence
    │
    ▼
Store Consultation
    │
    ▼
Return Structured Response
```

For recognized symptoms, the engine currently assigns a higher confidence score. Unknown symptoms fall back to a lower-confidence generic response.

This design keeps the decision process explicit and inspectable rather than hiding the logic inside an opaque model.

---

# 🧩 Knowledge Base

The current backend contains structured information for supported conditions.

Example:

```javascript
const knowledgeBase = {
  headache: {
    advice: "Take rest, stay hydrated, and consider paracetamol if needed.",
    warning: "See a doctor if headaches persist or worsen.",
    reliefOptions: [
      {
        name: "Paracetamol",
        type: "OTC",
        dosage: "500mg"
      },
      {
        name: "Hydration",
        type: "Lifestyle",
        dosage: "Drink plenty of water"
      }
    ]
  }
};
```

Adding a new supported condition can therefore follow the same structure:

```javascript
knowledgeBase.migraine = {
  advice: "...",
  warning: "...",
  reliefOptions: [
    {
      name: "...",
      type: "...",
      dosage: "..."
    }
  ]
};
```

---

# 🔐 Security Considerations

Because this application deals with potentially sensitive health information, production deployment requires significantly stronger security controls than the current MVP provides.

The current prototype should **not be considered production-ready for real patient data**.

Before production use, the following should be implemented:

* HTTPS/TLS
* Authentication
* Authorization
* Secure session management
* Database-backed persistence
* Encryption at rest
* Encryption in transit
* Input validation
* Rate limiting
* Audit logging
* Secure HTTP headers
* CORS allowlisting
* Secrets management
* Data retention policies
* Access control
* Appropriate healthcare/privacy compliance for the deployment jurisdiction

In particular, the current backend stores consultations in JavaScript arrays:

```javascript
let chatHistory = [];
let resultsStore = [];
```

This means data exists only in the running process and is lost whenever the server restarts.

This is intentional for the MVP but should be replaced with persistent storage before production deployment.

---

# 🗄️ Persistence

### Current implementation

```text
Express Server
     │
     ├── chatHistory[]
     │
     └── resultsStore[]
```

### Recommended production architecture

```text
React Frontend
      │
      ▼
HTTPS / API
      │
      ▼
Express Backend
      │
      ├── Authentication
      ├── Validation
      ├── Health Engine
      ├── Authorization
      │
      ▼
PostgreSQL / Managed Database
```

A relational database such as PostgreSQL would provide a better foundation for:

* Users
* Consultation sessions
* Symptoms
* Medical history
* Recommendations
* Audit records
* Timestamps
* Relationships between records

---

# 🏭 Production Deployment

The application is currently structured so that frontend and backend can be deployed independently.

## Frontend

Build the frontend:

```bash
cd health-companion-frontend
npm install
npm run build
```

This generates a production build in:

```text
dist/
```

The generated frontend can then be served through a static hosting provider or web server.

For example:

```text
Browser
   │
   ▼
Frontend Hosting
   │
   ▼
React/Vite Application
```

---

## Backend

On the backend server:

```bash
git clone https://github.com/AdahJerrie/Health-Companion.git
cd Health-Companion/health-companion-backend

npm install
npm start
```

The backend listens on port `5000`.

For a production environment, the application should ideally sit behind a reverse proxy such as Nginx:

```text
Internet
   │
   ▼
HTTPS
   │
   ▼
Nginx / Reverse Proxy
   │
   ▼
Node.js / Express
   │
   ▼
Application
```

The Node process should also be managed by a process manager such as PM2 or deployed through a managed Node.js hosting platform.

---

# 🌐 Production Frontend Configuration

The frontend should not hard-code a development API address in a production environment.

A production implementation should use an environment variable such as:

```env
VITE_API_URL=https://api.example.com
```

Then API calls can use:

```javascript
const API_URL = import.meta.env.VITE_API_URL;

const response = await fetch(
  `${API_URL}/api/consultation`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  }
);
```

This allows the same frontend codebase to work across:

```text
Development
    ↓
http://localhost:5000

Staging
    ↓
https://staging-api.example.com

Production
    ↓
https://api.example.com
```

---

# 🧪 Testing the API

A simple health consultation can be tested with `curl`:

```bash
curl -X POST http://localhost:5000/api/consultation \
  -H "Content-Type: application/json" \
  -d '{
    "symptom": "headache",
    "age": 30,
    "medicalHistory": []
  }'
```

You should receive a JSON response containing:

* Advice
* Warning
* Relief options
* Confidence
* Session ID

---

# 🔍 Code Quality

The frontend provides ESLint through:

```bash
npm run lint
```

A production development workflow should also include:

```text
Lint
  ↓
Unit Tests
  ↓
Integration Tests
  ↓
Build
  ↓
Deployment
```

Recommended future additions include:

* Backend unit tests
* API integration tests
* Frontend component tests
* End-to-end tests
* API schema validation
* CI/CD checks

---

# 📈 Roadmap

Health Companion is currently an MVP. The architecture provides a foundation for further development.

## Phase 1 — Foundation

* [x] React frontend
* [x] Express backend
* [x] REST API
* [x] Symptom consultation
* [x] Rule-based health engine
* [x] Context-aware warnings
* [x] Consultation results
* [x] History tracking

## Phase 2 — Reliability

* [ ] Automated backend tests
* [ ] Frontend component tests
* [ ] API validation
* [ ] Centralized error handling
* [ ] Structured logging
* [ ] API documentation

## Phase 3 — Persistence

* [ ] PostgreSQL
* [ ] User accounts
* [ ] Persistent consultation history
* [ ] Database migrations
* [ ] Backup strategy

## Phase 4 — Security

* [ ] Authentication
* [ ] Authorization
* [ ] HTTPS
* [ ] Rate limiting
* [ ] Secure headers
* [ ] Input sanitization
* [ ] Audit logging
* [ ] Secrets management

## Phase 5 — AI Integration

The current engine is rule-based. A future version can introduce an LLM as a controlled reasoning layer while keeping deterministic safety rules around it.

A possible architecture:

```text
User
 │
 ▼
Input Validation
 │
 ▼
Safety / Emergency Rules
 │
 ├── Emergency ──────► Immediate escalation
 │
 └── Safe to process
          │
          ▼
     Context Builder
          │
          ▼
       AI / LLM
          │
          ▼
     Output Validator
          │
          ▼
    Safety Rules Engine
          │
          ▼
      User Response
```

The goal would be to use AI for natural-language understanding and personalization without allowing an LLM to become the sole authority for medical decisions.

---

# ⚠️ Medical Safety Disclaimer

Health Companion is an experimental software project intended for educational, demonstration and prototyping purposes.

The information generated by the application should **not** be interpreted as medical diagnosis, treatment or professional medical advice.

Users experiencing severe, persistent or emergency symptoms should seek assistance from a qualified healthcare professional or appropriate emergency service.

The application should not be deployed for real patient care without appropriate clinical validation, security controls, privacy protections, regulatory review and professional oversight.

---

# 🤝 Contributing

Contributions are welcome.

A typical contribution workflow:

```bash
git clone https://github.com/AdahJerrie/Health-Companion.git
cd Health-Companion
```

Create a feature branch:

```bash
git checkout -b feature/your-feature
```

Make your changes, test them, then commit:

```bash
git add .
git commit -m "feat: describe your change"
```

Push the branch:

```bash
git push origin feature/your-feature
```

Then open a Pull Request.

### Suggested commit convention

```text
feat: add consultation endpoint
fix: handle unknown symptoms
refactor: separate health engine
test: add consultation API tests
docs: update deployment guide
```

---

# 📄 License

This project currently uses the license declared in the individual project configuration.

For production or open-source distribution, the repository should explicitly include a root-level `LICENSE` file defining the project's licensing terms.

---

# 👨🏽‍💻 Author

## Jeremiah Adah

Software Engineer focused on backend systems, AI-enabled applications and production-oriented software engineering.

**GitHub:**
https://github.com/AdahJerrie

**Project:**
https://github.com/AdahJerrie/Health-Companion

---

# 💡 Engineering Highlights

Health Companion demonstrates several practical software engineering concepts:

* Full-stack application architecture
* REST API design
* Client-server communication
* React component architecture
* Routing
* Backend business logic
* Rule-based decision systems
* Context-aware personalization
* Structured JSON APIs
* In-memory session management
* Separation of frontend and backend concerns
* Development vs. production considerations
* Extensible health knowledge representation

The project is intentionally small enough to understand end-to-end while providing a foundation for evolving toward a more robust AI-assisted healthcare platform.

---

## Project Status

**Current status:** MVP / Prototype

**Frontend:** React + Vite

**Backend:** Node.js + Express

**Storage:** In-memory

**AI approach:** Rule-based knowledge engine

**Production readiness:** Not yet suitable for real patient data

---

> **Built as an engineering exploration into intelligent, context-aware health applications — with safety, transparency and extensibility as core design considerations.**
