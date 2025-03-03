import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

const AnswerComponent = () => {
  const [answer, setAnswer] = useState(""); // State to store the user's answer
  const {setShowAnswerComponent,setSubmitted, setUserAnswer } = useContext(AppContext); // Use context to set the answer

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Please enter an answer.");
      return;
    }
    setUserAnswer(answer);
    setAnswer(""); // Clear the textarea
    setSubmitted(true);
    setShowAnswerComponent(false);
  };

  return (
    <div className="p-6 bg-white border-t rounded-lg">
      <h2 className="text-lg font-semibold text-gray-800">Memory test!</h2>
      <p className="text-gray-600 text-sm">Write down everything you remember from your reading or what you understand.</p>

      <div className="mt-4">
        <textarea
          className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-52 shadow-sm"
          placeholder="Type here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>

      <button
        className="mt-4 w-full px-5 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-md"
        onClick={handleSubmit}
      >
        Evaluate
      </button>
    </div>
  );
};

export default AnswerComponent;
