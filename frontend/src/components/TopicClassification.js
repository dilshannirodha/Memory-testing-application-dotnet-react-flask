import React, { useState } from "react";
import axios from "axios";

const TopicClassification = () => {
  const [text, setText] = useState("");
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClassify = async () => {
    if (!text) return alert("Please enter text to classify.");

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5001/classify", { text });
      setTopic(response.data.topic);
    } catch (error) {
      console.error("Error classifying text:", error);
      setTopic("Failed to classify topic.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Topic Classification</h2>
      <textarea
        rows="5"
        cols="50"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to classify..."
      />
      <br />
      <button onClick={handleClassify} disabled={loading}>
        {loading ? "Classifying..." : "Classify"}
      </button>
      <h3>Topic:</h3>
      <p>{topic}</p>
    </div>
  );
};

export default TopicClassification;