import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

const AnswerComponent = () => {
  const [answer, setAnswer] = useState(""); // State to store the user's answer
  const { setAnswer: setContextAnswer } = useContext(AppContext); // Use context to set the answer

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Please enter an answer.");
      return;
    }

    // Set the answer to the context
    setContextAnswer(answer);
    setAnswer(""); // Clear the textarea
  };

  return (
    <div className="p-4 border-t bg-white">
      <div className="flex flex-col gap-2">
        <textarea
          className="w-full p-2 border rounded-lg focus:outline-none  resize-none h-64"
          placeholder="Enter your answer..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
        >
          Submit Answer
        </button>
      </div>
    </div>
  );
};

export default AnswerComponent;
