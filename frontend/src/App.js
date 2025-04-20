import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import { AppContextProvider } from "./contexts/AppContext";
import AskAI from "./pages/AskAI";
import Profile from "./pages/Profile";
import LoginRegister from "./components/LoginRegister";

const App = () => {
  return (
    <AppContextProvider>
      <div className="flex">
      {/* Navigation Bar */}
      <Navbar />
  
      {/* Main Content */}
      <div className="ml-64 p-6 flex-grow "
      style={{
        backgroundColor: "", // Midnight Owl color
      }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask-ai" element={<AskAI />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/login" element={<LoginRegister />} />
          <Route path="/register" element={<LoginRegister />} />
        </Routes>
      </div>
    </div>

    </AppContextProvider>
    
  );
};

export default App;