import React, { useContext } from "react";
import AppContext from "../contexts/AppContext";

const ResultComponent = () => {
  const { messages } = useContext(AppContext); // Use context to access chat messages

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`mb-4 ${
            msg.role === "user" ? "text-right" : "text-left"
          }`}
        >
          <div
            className={`inline-block p-3 rounded-lg ${
              msg.role === "user"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResultComponent;