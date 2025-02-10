import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import Navbar from "./components/Navbar";
import Home from "./pages/Home"
import { AppContextProvider } from "./contexts/AppContext";
import AskAI from "./pages/AskAI";
import Logout from "./pages/Logout";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <AppContextProvider>
      <div className="flex">
      {/* Navigation Bar */}
      <Navbar />
  
      {/* Main Content */}
      <div className="ml-64 p-6 flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask-ai" component={AskAI} />
          <Route path="/profile" component={Profile} />
          <Route path="/logout" component={Logout} />
        </Routes>
      </div>
    </div>

    </AppContextProvider>
    
  );
};

export default App;