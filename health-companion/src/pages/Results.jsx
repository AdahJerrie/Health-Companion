// src/pages/Results.jsx  (full file)

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const stateSessionId = location.state?.sessionId;

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        // 1) Prefer session id passed via route state
        let sid = stateSessionId;

        // 2) Fallback: look in localStorage
        if (!sid) {
          const stored = localStorage.getItem("lastSessionId");
          if (stored) sid = parseInt(stored, 10);
        }

        if (sid) {
          // fetch the specific session result
          const res = await fetch(`http://localhost:5000/api/results/${sid}`);
          if (res.ok) {
            const data = await res.json();
            setResult(data);
            return;
          }
        }

        // 3) Final fallback: pull the latest result from the list
        const resAll = await fetch("http://localhost:5000/api/results");
        const all = await resAll.json();
        if (Array.isArray(all) && all.length > 0) {
          setResult(all[all.length - 1]);
        } else {
          setResult(null);
        }
      } catch (err) {
        console.error("Error loading result:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [stateSessionId]);

  const noResults = !result;

  return (
    <div className="p-6 sm:p-8 space-y-6">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-200 to-purple-200 rounded-2xl p-6 sm:p-8 shadow-lg text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          🧾 Consultation Results
        </h1>
        <p className="text-md sm:text-lg text-gray-700 mt-2">
          {loading
            ? "Loading your result..."
            : noResults
            ? "No results available yet"
            : "Here’s what we found based on your consultation"}
        </p>
      </motion.div>

      {!loading && !noResults && (
        <>
          {/* Symptoms */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="font-semibold text-lg text-gray-800 mb-3">
              Your Reported Symptoms:
            </h2>
            <p className="text-gray-700">
              {Array.isArray(result.symptoms)
                ? result.symptoms.join(", ")
                : String(result.symptoms || "")}
            </p>
          </motion.div>

          {/* AI Advice */}
          <motion.div
            className="bg-white rounded-xl shadow-md p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="font-semibold text-lg text-gray-800 mb-3">
              AI Health Advice:
            </h2>
            <p className="text-gray-700">{result.advice}</p>

            {!!result.warning && (
              <p className="text-red-600 mt-3 font-medium">
                ⚠️ Warning: {result.warning}
              </p>
            )}

            {Array.isArray(result.reliefOptions) && result.reliefOptions.length > 0 && (
              <div className="mt-4">
                <h3 className="font-medium text-gray-800 mb-2">
                  Suggested Relief Options:
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  {result.reliefOptions.map((opt, idx) => (
                    <li key={idx}>
                      {typeof opt === "string"
                        ? opt
                        : `${opt.name} (${opt.type}) – ${opt.dosage}`}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        </>
      )}

      {/* Actions */}
      <motion.div className="flex justify-center gap-4">
        <Button
          onClick={() => navigate("/consultation")}
          className="px-5 py-3 text-md rounded-xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Start New Consultation
        </Button>

        <Button
          onClick={() => navigate("/history")}
          className="px-5 py-3 text-md rounded-xl bg-green-500 hover:bg-green-600"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View History
        </Button>
      </motion.div>
    </div>
  );
}
