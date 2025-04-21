import React, { useState, useContext, useEffect,  useRef } from "react";
import AppContext from "../contexts/AppContext";
import Progress from "./Progress";
import Spinner from "./Spinner";

  const Evaluation = () => {
    const { userAnswer, text, evaluation, setEvaluation } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const hasSubmittedRef = useRef(false); 
    useEffect(() => {
      const compareAndSaveEvaluation = async () => {
        if (!text || !userAnswer || hasSubmittedRef.current) return;
  
        hasSubmittedRef.current = true; 
        setLoading(true);
        setError(null);
  
        try {
          const flaskResponse = await fetch("http://localhost:5001/compare", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              study_material: text,
              user_answer: userAnswer
            }),
          });
  
          if (!flaskResponse.ok) throw new Error("Failed to fetch evaluation");
  
          const flaskData = await flaskResponse.json();
          const result = flaskData.comparison_result;
          setEvaluation(result);
  
          const savePayload = {
            userId: parseInt(localStorage.getItem("id"), 10),
            overallScore: result.overall_score,
            contentAccuracy: result.detailed_scores.content_accuracy,
            coverage: result.detailed_scores.coverage,
            clarity: result.detailed_scores.clarity,
            structure: result.detailed_scores.structure,
            terminology: result.detailed_scores.terminology,
            originality: result.detailed_scores.originality
          };
  
          const netResponse = await fetch("http://localhost:5000/api/Evaluation/save", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(savePayload)
          });
  
          if (!netResponse.ok) throw new Error("Failed to save evaluation to backend");
  
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      compareAndSaveEvaluation();
    }, [text, userAnswer, setEvaluation]);
  

  return (
    <div className="min-h-screen">
      <div className="mx-auto bg-white p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Evaluation Results</h2>

        {loading && <p className="text-blue-500">Evaluating and saving your answer...</p>}

        {!loading && evaluation && (
          <>
            <Progress g={loading} />
            <div className="mt-6 p-4 bg-green-100 border border-green-400 rounded-lg">
              <p><strong>Clarity:</strong> {evaluation.detailed_scores.clarity}</p>
              <p><strong>Content Accuracy:</strong> {evaluation.detailed_scores.content_accuracy}</p>
              <p><strong>Coverage:</strong> {evaluation.detailed_scores.coverage}</p>
              <p><strong>Structure:</strong> {evaluation.detailed_scores.structure}</p>
              <p><strong>Terminology:</strong> {evaluation.detailed_scores.terminology}</p>
              <p><strong>Originality:</strong> {evaluation.detailed_scores.originality}</p>
              <p><strong>Overall Score:</strong> {evaluation.overall_score}</p>
            </div>
          </>
        )}

    {loading === true ? (
        <Spinner />
      ):
      ""}

        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default Evaluation;
