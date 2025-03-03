import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

const Evaluation = () => {
  const { userAnswer, text } = useContext(AppContext); // Study material & user answer
  const [evaluation, setEvaluation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const compareAnswer = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("http://localhost:5001/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ study_material: text, user_answer: userAnswer }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch evaluation");
      }

      const data = await response.json();
      
      console.log("API Response:", data); // Debugging - check structure
      setEvaluation(data.comparison_result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Answer Evaluation</h1>
      
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Let's Test Your Memory!</h2>
     
        <button
          onClick={compareAnswer}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Evaluating..." : "Evaluate Answer"}
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        {evaluation && (
          <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg">
            <h3 className="text-lg font-semibold">Evaluation Result:</h3>
            <pre className="whitespace-pre-wrap">{evaluation}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default Evaluation;
