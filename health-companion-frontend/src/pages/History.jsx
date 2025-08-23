import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";

export default function History() {
  const [history, setHistory] = useState([]);
  const [openSession, setOpenSession] = useState(null);

  const fetchHistory = () => {
    fetch("http://localhost:5000/api/results")
      .then(res => res.json())
      .then(data => setHistory(data))
      .catch(err => console.error("Error fetching history:", err));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const toggleSession = (index) => {
    setOpenSession(openSession === index ? null : index);
  };

  const handleClearHistory = async () => {
    if (!window.confirm("Are you sure you want to clear all history?")) return;
    try {
      await fetch("http://localhost:5000/api/history/clear", { method: "DELETE" });
      setHistory([]);
      setOpenSession(null);
      alert("All consultation history cleared ✅");
    } catch (err) {
      console.error("Error clearing history:", err);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">Consultation History</h1>
        <button
          onClick={handleClearHistory}
          className="flex items-center gap-2 bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
        >
          <Trash2 className="w-4 h-4" /> Clear History
        </button>
      </div>

      {history.length === 0 ? (
        <p className="text-gray-600 text-center">No consultation history yet.</p>
      ) : (
        <div className="space-y-4">
          {history.map((session, index) => (
            <div key={index} className="border rounded-xl shadow-md bg-white">
              {/* Session Header */}
              <button
                onClick={() => toggleSession(index)}
                className="w-full flex justify-between items-center p-4 rounded-t-xl hover:bg-gray-50"
              >
                <div className="text-left">
                  <h2 className="font-semibold text-lg text-gray-800">
                    Session #{index + 1}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {new Date(session.date || session.timestamp).toLocaleString()}
                  </p>
                </div>
                {openSession === index ? (
                  <ChevronDown className="text-gray-600" />
                ) : (
                  <ChevronRight className="text-gray-600" />
                )}
              </button>

              {/* Expandable Content */}
              {openSession === index && (
                <div className="p-4 border-t space-y-3">
                  <p>
                    <span className="font-semibold">Symptoms:</span>{" "}
                    {Array.isArray(session.symptoms) ? session.symptoms.join(", ") : session.symptoms}
                  </p>
                  <p>
                    <span className="font-semibold">Advice:</span> {session.advice}
                  </p>
                  <p className="text-red-600">
                    <span className="font-semibold">Warning:</span> {session.warning}
                  </p>
                  {session.age && (
                    <p>
                      <span className="font-semibold">Age:</span> {session.age}
                    </p>
                  )}
                  {session.medicalHistory && (
                    <p>
                      <span className="font-semibold">Medical History:</span> {session.medicalHistory}
                    </p>
                  )}
                  {session.reliefOptions?.length > 0 && (
                    <div>
                      <span className="font-semibold">Relief Options:</span>
                      <ul className="list-disc ml-6">
                        {session.reliefOptions.map((opt, i) => (
                          <li key={i}>{opt.name} ({opt.type}) – {opt.dosage}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
