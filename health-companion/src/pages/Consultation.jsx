import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Consultation() {
  const [symptom, setSymptom] = useState("");
  const [age, setAge] = useState("");
  const [medicalHistory, setMedicalHistory] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // ✅ Split symptoms into array (support comma-separated input)
      const symptomsArray = symptom
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const res = await fetch("http://localhost:5000/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms: symptomsArray, age, medicalHistory }),
      });
      const data = await res.json();

      // keep a fallback so Results can recover on refresh/direct visit
      localStorage.setItem("lastSessionId", String(data.sessionId));

      navigate("/results", { state: { sessionId: data.sessionId } });
    } catch (err) {
      console.error("Consultation submit failed:", err);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Health Consultation</h1>
      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <input
          type="text"
          placeholder="Enter your symptom(s), comma separated"
          value={symptom}
          onChange={(e) => setSymptom(e.target.value)}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          placeholder="Enter your age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <textarea
          placeholder="Enter medical history"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Get Advice & View Results
        </button>
      </form>
    </div>
  );
}
