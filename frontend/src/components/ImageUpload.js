import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../contexts/AppContext"; // Import your AppContext

const ImageUpload = () => {
  const [file, setFile] = useState(null); // State to store the uploaded file
  const [loading, setLoading] = useState(false); // State to handle loading state
  const { setText } = useContext(AppContext); // Use context to set extracted text

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  // Submit the uploaded file to the backend
  const handleFileSubmit = async () => {
    if (!file) {
      alert("Please select an image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5001/api/ocr", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.text) {
        setText(response.data.text); // Set the extracted text to the context
      } else {
        alert("No text was extracted from the image.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-center mb-6">Image Upload</h1>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <input
          type="file"
          accept="image/*" // Allow only image files
          onChange={handleFileUpload}
          className="mb-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleFileSubmit}
          disabled={loading}
          className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500`}
        >
          {loading ? "Processing..." : "Upload Image"}
        </button>
      </div>
    </div>
  );
};

export default ImageUpload;