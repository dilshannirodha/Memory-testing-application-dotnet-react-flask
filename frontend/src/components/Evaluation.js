import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import Progress from "./Progress";

const Evaluation = () => {
  const { userAnswer, text, evaluation, setEvaluation } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const compareAnswer = async () => {
      if (text && userAnswer) {
        setLoading(true);
        setError(null);
   
        
        try {
          const response = await fetch("http://localhost:5001/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              study_material: text, 
              user_answer: userAnswer 
            }),
          });

          if (!response.ok) throw new Error("Failed to fetch evaluation");
          
          const data = await response.json();
          console.log(data.comparison_result)
          setEvaluation(data.comparison_result);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    compareAnswer();
  }, [text, userAnswer, setEvaluation]);

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <div className=" mx-auto bg-white p-6 rounded-lg ">
        <h2 className="text-xl font-semibold mb-4">Evaluation Results</h2>
        
        {loading && <p className="text-blue-500">Evaluating your answer...</p>}
        
        {!loading && evaluation && (
          <>
            <Progress g={loading} />
            <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg">
    
            </div>
          </>
        )}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Evaluation;