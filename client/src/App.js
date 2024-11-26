import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { auth } from "./Firebase"; 
import { onAuthStateChanged } from "firebase/auth";

import axios from "axios";
import Landing from "./pages/Landing";
import HomePage from "./pages/HomePage";
import UserProfile from "./components/UserProfile";
import Roadmap from "./pages/Roadmap";
import Skills from "./pages/Skills";
import ProjectsPage from "./pages/Projects";
import ResumePage from "./pages/Resumes";
import Chatbot from "./pages/Chatbot";
const apiUrl = process.env.REACT_APP_API_ENDPOINT;


export default function App() {
  const [user, setUser] = useState(null); // State to manage logged-in user
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const userData = {
          name: currentUser.displayName,
          email: currentUser.email,
          picture: currentUser.photoURL,
        };
        setUser(userData);

        // Save user to backend 
        try {
          const response = await axios.post(`${apiUrl}/saveUser`, userData);
          console.log("User data saved:", response.data);
        } catch (error) {
          console.error("Error saving user data:", error);
        }
      } else {
        setUser(null);
      }
      setLoading(false); 
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <BrowserRouter>
    <Routes>
      {/* Public route */}
      <Route path="/" element={<Landing />} />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          user ? <HomePage /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/profile"
        element={
          user ? <UserProfile /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/roadmap"
        element={
          user ? <Roadmap /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/skills-required"
        element={
          user ? <Skills /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/project-ideas"
        element={
          user ? <ProjectsPage /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/resume-build"
        element={
          user ? <ResumePage /> : <Navigate to="/" replace />
        }
      />
      <Route
        path="/chatbot"
        element={
          user ? <Chatbot /> : <Navigate to="/" replace />
        }
      />
    </Routes>
  </BrowserRouter>
  );
}
