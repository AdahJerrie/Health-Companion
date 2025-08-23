import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css';

import Layout from './components/Layout';
import Home from './pages/Home';
import Consultation from './pages/Consultation';
import Profile from './pages/Profile';
import History from './pages/History';
import About from './pages/About';
import Results from './pages/Results'; // ✅ new import

function AppWrapper() {
  const [userProfile, setUserProfile] = useState({ age: "", medicalHistory: [] });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "consultation", element: <Consultation userProfile={userProfile} /> },
        { path: "results", element: <Results /> },   /* ✅ new Results route */
        { path: "history", element: <History /> },
        { path: "profile", element: <Profile userProfile={userProfile} setUserProfile={setUserProfile} /> },
        { path: "about", element: <About /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
