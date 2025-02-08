import React, { useState } from "react";
import axios from "axios";

const SummarizeText = () => {
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text) return alert("Please enter text to summarize.");
    
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/summarize-text", { text });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error summarizing text:", error);
      setSummary("Failed to generate summary.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Summarize Text</h2>
      <textarea
        rows="5"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to summarize..."
      />
      <br />
      <button onClick={handleSummarize} disabled={loading}>
        {loading ? "Summarizing..." : "Summarize"}
      </button>
      <h3>Summary:</h3>
      <p>{summary}</p>
    </div>
  );
};

export default SummarizeText;
