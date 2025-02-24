import React, { useState, useContext } from "react";
import axios from "axios";
import TextContext  from "../contexts/TextContext"; // Import the context

const SetTextFromFile = ({ fileId }) => {
  const { setText } = useContext(TextContext); // Use the context to set the text
  const [loading, setLoading] = useState(false); // State to track loading
  const [error, setError] = useState(null); // State to track errors

  const fetchText = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5000/api/File/extract-text/${fileId}`
      );
      setText(response.data.extracted_text); // Set the extracted text into the context
    } catch (err) {
      setError("Failed to fetch text. Please try again.");
      console.error("Error fetching text:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <button
        onClick={fetchText}
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
      >
        {loading ? "Fetching Text..." : "Fetch Text"}
      </button>
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
};

export default SetTextFromFile;