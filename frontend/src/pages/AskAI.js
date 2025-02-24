import React from "react";
import ChatComponent from "../components/ChatComponent";
import Result from "../components/Result";

const AskAI = () => {
  return (
    <div className="flex flex-col h-screen pl-64">
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Result Section */}
        <div className="h-full">
          <Result />
        </div>
      </main>

      {/* Chat Section (Fixed at the Bottom) */}
      <div className="fixed bottom-0 left-64 right-0 bg-white border-t shadow-lg">
        <ChatComponent />
      </div>
    </div>
  );
};

export default AskAI;