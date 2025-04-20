import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

const AnswerComponent = () => {
  const [answer, setAnswer] = useState("");
  const { setShowAnswerComponent, setSubmitted, setUserAnswer } = useContext(AppContext);

  const handleSubmit = () => {
    if (!answer.trim()) {
      alert("Please enter an answer.");
      return;
    }
    setUserAnswer(answer);
    setAnswer("");
    setSubmitted(true);
    setShowAnswerComponent(false);
  };

  return (
    <div className="p-6 bg-white border-t rounded-xl ">
      <h2 className="text-xl font-semibold text-gray-800">Memory Test</h2>
      <p className="text-gray-600 text-m">Write down everything you remember or understand from your reading.</p>

      <div className="mt-4">
        <textarea
        style={{ width: '800px', height: '400px', padding: '20px' }}
          className="w-full p-4 rounded-xl text-lg h-72 resize-none focus:outline-none  placeholder:text-gray-500 "
          placeholder="Type here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      </div>

      <button
      style={{ width: '400px'}}
        className="mt-6 w-full px-5 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-lg"
        onClick={handleSubmit}
      >
        Evaluate
      </button>
    </div>
  );
};

export default AnswerComponent;
