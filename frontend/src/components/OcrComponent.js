import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../contexts/AppContext"; // Import the context

const OcrComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { text,setText } = useContext(AppContext); // Use the context to set the text

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a file");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await axios.post("http://localhost:5001/api/ocr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setText(response.data.text); // Set the extracted text into the context
    } catch (err) {
      setError("Error during OCR process");
      console.error("Error during OCR process:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="bg-white p-8 rounded-lg w-auto max-w-md"> {/* Adjusted for text fitting */}
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Upload Your PDF or Image to Extract Text
        </h1>

        <div className="mb-4">
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full py-2 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full py-2 px-4 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
        >
          {loading ? "Processing..." : "Upload and Extract Text"}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">{error}</p>
        )}
        
      </div>
  );
};

export default OcrComponent;
