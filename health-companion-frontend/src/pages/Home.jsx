// src/pages/Home.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Stethoscope, History, User, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Random Health Tips
  const tips = [
    "💧 Stay hydrated! Aim for 8 cups of water daily.",
    "😴 Sleep 7–8 hours every night for better immunity.",
    "🥦 Eat more fruits and vegetables to stay energized.",
    "🚶 Take a 15-minute walk daily to boost circulation.",
    "🧘 Practice deep breathing to reduce stress.",
  ];

  const [tip, setTip] = useState("");

  useEffect(() => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  }, []);

  return (
    <div className="min-h-screen p-4 sm:p-6 space-y-6 sm:space-y-8 bg-gradient-to-br from-green-50 via-white to-blue-50">
      {/* Hero Section */}
      <motion.div
        className="bg-gradient-to-r from-green-200 to-blue-200 rounded-2xl p-6 sm:p-8 shadow-xl text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Hello, 👋
        </h1>
        <p className="text-md sm:text-lg text-gray-600 mt-2">
          How are you feeling today?
        </p>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Consultation Card */}
        <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring" }}>
          <Card className="cursor-pointer hover:shadow-2xl hover:bg-blue-50 transition">
            <CardContent className="flex flex-col items-center p-4 sm:p-6">
              <Stethoscope className="h-8 w-8 sm:h-10 sm:w-10 text-blue-500 mb-3 sm:mb-4" />
              <h2 className="font-semibold text-sm sm:text-base">Start Consultation</h2>
              <Button
                className="mt-3 w-full text-sm sm:text-base"
                onClick={() => navigate("/consultation")}
              >
                Begin
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* History Card */}
        <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring" }}>
          <Card className="cursor-pointer hover:shadow-2xl hover:bg-green-50 transition">
            <CardContent className="flex flex-col items-center p-4 sm:p-6">
              <History className="h-8 w-8 sm:h-10 sm:w-10 text-green-500 mb-3 sm:mb-4" />
              <h2 className="font-semibold text-sm sm:text-base">View History</h2>
              <Button
                className="mt-3 w-full text-sm sm:text-base"
                onClick={() => navigate("/history")}
              >
                Open
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Profile Card */}
        <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring" }}>
          <Card className="cursor-pointer hover:shadow-2xl hover:bg-purple-50 transition">
            <CardContent className="flex flex-col items-center p-4 sm:p-6">
              <User className="h-8 w-8 sm:h-10 sm:w-10 text-purple-500 mb-3 sm:mb-4" />
              <h2 className="font-semibold text-sm sm:text-base">Profile</h2>
              <Button
                className="mt-3 w-full text-sm sm:text-base"
                onClick={() => navigate("/profile")}
              >
                Manage
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* About Card */}
        <motion.div whileHover={{ scale: 1.05, y: -4 }} transition={{ type: "spring" }}>
          <Card className="cursor-pointer hover:shadow-2xl hover:bg-orange-50 transition">
            <CardContent className="flex flex-col items-center p-4 sm:p-6">
              <Info className="h-8 w-8 sm:h-10 sm:w-10 text-orange-500 mb-3 sm:mb-4" />
              <h2 className="font-semibold text-sm sm:text-base">About App</h2>
              <Button
                className="mt-3 w-full text-sm sm:text-base"
                onClick={() => navigate("/about")}
              >
                Learn More
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Health Tip */}
      <motion.div
        key={tip} // ensures smooth fade when tip changes
        className="bg-white rounded-xl shadow-md p-4 sm:p-5 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <p className="text-gray-700 text-sm sm:text-lg font-medium">{tip}</p>
      </motion.div>

      {/* Motivational Footer */}
      <div className="text-center text-gray-500 mt-6 sm:mt-8 text-sm sm:text-base italic">
        ❤️ Your health is your wealth
      </div>
            {/* Motivational Footer */}
      <div className="text-center text-gray-500 mt-6 sm:mt-8 text-sm sm:text-base">
        ❤️ Eat clean, Drink water, Stay active
        <br />
        BE HEALTHY!
      </div>
      {/* Featured Articles / Health Education */}
            {/* Featured Articles / Health Education */}
      <motion.div
        className="mt-10 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >

      </motion.div>
      <motion.div
        className="mt-10 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
          📚 Health Education
        </h2>
        <div className="bg-white rounded-xl shadow-md p-6 text-center text-gray-600">
          Articles will be updated later.
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            {
              title: "5 Ways to Reduce Stress",
              desc: "Simple breathing and mindfulness exercises to calm your mind.",
            },
            {
              title: "Why Hydration Matters",
              desc: "Discover the impact of water on your brain and body performance.",
            },
            {
              title: "The Power of Vegetables",
              desc: "Nutrient-packed greens to keep you strong and energized.",
            },
          ].map((article, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="font-semibold text-gray-800 mb-2">{article.title}</h3>
              <p className="text-gray-600 text-sm">{article.desc}</p>
              <Button className="mt-3 text-sm">Read More</Button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Community Tips / Testimonials */}
      <motion.div
        className="mt-12 space-y-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center">
          💬 What People Are Saying
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {[
            "“This app keeps me motivated to check my health daily!”",
            "“I love the simple design — it makes staying healthy fun.”",
            "“The quick tips are super helpful, I’ve improved my habits!”",
          ].map((quote, idx) => (
            <motion.div
              key={idx}
              className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl shadow p-4 sm:p-6 text-gray-700 italic hover:shadow-lg transition"
              whileHover={{ scale: 1.02 }}
            >
              {quote}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
