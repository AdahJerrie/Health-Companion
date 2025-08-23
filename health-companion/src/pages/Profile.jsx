import { useState } from "react";

function Profile({ userProfile, setUserProfile }) {
  const [age, setAge] = useState(userProfile.age || "");
  const [medicalHistory, setMedicalHistory] = useState(userProfile.medicalHistory || "");

  const handleSave = () => {
    setUserProfile({
      age: Number(age),
      medicalHistory: medicalHistory.split(",").map(item => item.trim()),
    });
    alert("Profile saved!");
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="mb-4">
        <label className="block mb-1">Age:</label>
        <input
          type="number"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Medical History (comma-separated):</label>
        <input
          type="text"
          value={medicalHistory}
          onChange={(e) => setMedicalHistory(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Save Profile
      </button>
    </div>
  );
}

export default Profile;
