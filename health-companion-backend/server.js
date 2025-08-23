import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// In-memory storage for chat sessions
let chatHistory = [];
let resultsStore = []; // store results separately

// 🔑 Knowledge base for conditions
const knowledgeBase = {
  headache: {
    advice: "Take rest, stay hydrated, and consider paracetamol if needed.",
    warning: "See a doctor if headaches persist or worsen.",
    reliefOptions: [
      { name: "Paracetamol", type: "OTC", dosage: "500mg" },
      { name: "Ibuprofen", type: "OTC", dosage: "200mg" },
      { name: "Hydration", type: "Lifestyle", dosage: "Drink plenty of water" },
    ],
  },
  fever: {
    advice: "Drink fluids, rest, and take acetaminophen if necessary.",
    warning: "See a doctor if fever is above 39°C or lasts more than 3 days.",
    reliefOptions: [
      { name: "Acetaminophen", type: "OTC", dosage: "500mg" },
      { name: "Rest", type: "Lifestyle", dosage: "Get adequate sleep" },
      { name: "Hydration", type: "Lifestyle", dosage: "Drink plenty of water" },
    ],
  },
  cough: {
    advice: "Drink warm fluids, rest, and consider honey or cough syrup.",
    warning: "See a doctor if cough persists or is accompanied by shortness of breath.",
    reliefOptions: [
      { name: "Honey", type: "Home Remedy", dosage: "1 tbsp" },
      { name: "Cough Syrup", type: "OTC", dosage: "10ml" },
      { name: "Steam Inhalation", type: "Home Remedy", dosage: "5-10 mins" },
    ],
  },
};

// POST /api/consultation
app.post("/api/consultation", (req, res) => {
  const { symptom, age, medicalHistory = [] } = req.body;
  const normalizedSymptom = symptom?.toLowerCase();

  let advice = "Rest and monitor your symptoms carefully.";
  let warning = "Seek medical attention if symptoms worsen.";
  let reliefOptions = [
    { name: "Rest", type: "Lifestyle", dosage: "Get adequate sleep" },
    { name: "Hydration", type: "Lifestyle", dosage: "Drink plenty of water" },
  ];
  let confidence = 0.4; // default low confidence

  // ✅ Look up in knowledge base
  if (knowledgeBase[normalizedSymptom]) {
    advice = knowledgeBase[normalizedSymptom].advice;
    warning = knowledgeBase[normalizedSymptom].warning;
    reliefOptions = knowledgeBase[normalizedSymptom].reliefOptions;
    confidence = 0.9;
  }

  // ✅ Rule-based personalization
  if (age && age > 65) {
    warning += " Because of your age, consult a doctor sooner.";
  }
  if (Array.isArray(medicalHistory)) {
    if (medicalHistory.includes("diabetes") && normalizedSymptom === "fever") {
      warning += " Since you have diabetes, monitor your blood sugar closely.";
    }
    if (medicalHistory.includes("asthma") && normalizedSymptom === "cough") {
      warning += " With asthma, persistent cough requires medical evaluation.";
    }
  }

  // ✅ Session messages
  const messages = [
    { sender: "user", text: symptom },
    { sender: "bot", text: `${advice}\n⚠️ ${warning}`, reliefOptions },
  ];

  const session = {
    id: chatHistory.length + 1,
    timestamp: new Date(),
    messages,
    age,
    medicalHistory,
    selectedRelief: [],
  };

  // Save into chat history
  chatHistory.push(session);

  // Also auto-save result into resultsStore
  resultsStore.push({
    sessionId: session.id,
    symptom,
    advice,
    warning,
    reliefOptions,
    confidence,
    age,
    medicalHistory,
    date: new Date().toISOString(),
  });

  res.json({
    advice,
    warning,
    reliefOptions,
    confidence,
    sessionId: session.id,
  });
});

// ✅ NEW: GET /api/results - list all saved results (for “latest” & history pages)
app.get("/api/results", (req, res) => {
  res.json(resultsStore);
});

// GET /api/results/:sessionId - fetch specific result
app.get("/api/results/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const result = resultsStore.find(r => r.sessionId === parseInt(sessionId));
  if (!result) return res.status(404).json({ error: "Result not found" });
  res.json(result);
});

// POST /api/history/add - add relief to session
app.post("/api/history/add", (req, res) => {
  const { sessionId, reliefItem } = req.body;
  const session = chatHistory.find(s => s.id === sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });
  session.selectedRelief.push(reliefItem);
  res.json({ success: true, message: `${reliefItem.name} added to history.` });
});

// GET /api/history - get all sessions
app.get("/api/history", (req, res) => {
  res.json(chatHistory);
});

// DELETE /api/history/clear - clear all sessions
app.delete("/api/history/clear", (req, res) => {
  chatHistory = [];
  resultsStore = [];
  res.json({ success: true, message: "All consultation history cleared." });
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
