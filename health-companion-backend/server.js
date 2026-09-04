import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

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
  // ✅ Accept the array the frontend actually sends
  const { symptoms, age, medicalHistory = [] } = req.body;
  const symptomList = Array.isArray(symptoms)
    ? symptoms
    : [symptoms].filter(Boolean);

  const normalizedSymptoms = symptomList.map((s) => s?.toLowerCase().trim());

  console.log("Received symptoms:", symptoms);
  console.log("Normalized symptoms:", normalizedSymptoms);

  let advice = "Rest and monitor your symptoms carefully.";
  let warning = "Seek medical attention if symptoms worsen.";
  let reliefOptions = [
    { name: "Rest", type: "Lifestyle", dosage: "Get adequate sleep" },
    { name: "Hydration", type: "Lifestyle", dosage: "Drink plenty of water" },
  ];
  let confidence = 0.4; // default low confidence

  // ✅ Match each symptom against the knowledge base
  const matched = normalizedSymptoms.filter((s) => knowledgeBase[s]);

  if (matched.length > 0) {
    console.log("Match found in knowledge base:", matched);
    advice = matched.map((s) => knowledgeBase[s].advice).join(" ");
    warning = matched.map((s) => knowledgeBase[s].warning).join(" ");
    reliefOptions = matched.flatMap((s) => knowledgeBase[s].reliefOptions);
    confidence = 0.9;
  } else {
    console.log("No match found in knowledge base");
  }

  // ✅ Rule-based personalization
  if (age && age > 65) {
    warning += " Because of your age, consult a doctor sooner.";
  }
  if (Array.isArray(medicalHistory)) {
    if (medicalHistory.includes("diabetes") && matched.includes("fever")) {
      warning += " Since you have diabetes, monitor your blood sugar closely.";
    }
    if (medicalHistory.includes("asthma") && matched.includes("cough")) {
      warning += " With asthma, persistent cough requires medical evaluation.";
    }
  }

  // ✅ Session messages
  const messages = [
    { sender: "user", text: symptomList.join(", ") },
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

  chatHistory.push(session);

  resultsStore.push({
    sessionId: session.id,
    symptom: symptomList.join(", "),
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

// GET /api/results
app.get("/api/results", (req, res) => {
  res.json(resultsStore);
});

// GET /api/results/:sessionId
app.get("/api/results/:sessionId", (req, res) => {
  const { sessionId } = req.params;
  const result = resultsStore.find((r) => r.sessionId === parseInt(sessionId));
  if (!result) return res.status(404).json({ error: "Result not found" });
  res.json(result);
});

// POST /api/history/add
app.post("/api/history/add", (req, res) => {
  const { sessionId, reliefItem } = req.body;
  const session = chatHistory.find((s) => s.id === sessionId);
  if (!session) return res.status(404).json({ error: "Session not found" });
  session.selectedRelief.push(reliefItem);
  res.json({ success: true, message: `${reliefItem.name} added to history.` });
});

// GET /api/history
app.get("/api/history", (req, res) => {
  res.json(chatHistory);
});

// DELETE /api/history/clear
app.delete("/api/history/clear", (req, res) => {
  chatHistory = [];
  resultsStore = [];
  res.json({ success: true, message: "All consultation history cleared." });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;