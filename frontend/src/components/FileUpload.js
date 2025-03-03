import React, { useState, useContext } from "react";
import axios from "axios";
import AppContext from "../contexts/AppContext";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setImages,setShowButtons } = useContext(AppContext); // Use context to set images
  const [success, setSuccess] = useState(false);

  // Handle file upload
  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
  };

  // Submit the uploaded file to the backend
  const handleFileSubmit = async () => {
    if (!file) {
      alert("Please select a PDF file.");
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

      if (response.data.images) {
        setImages(response.data.images); // Update the context with the new images
      } else {
        alert(response.data.error || "Error processing PDF.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while uploading the file.");
    } finally {
      setSuccess(true);
      
    }

    setShowButtons(true);
  };

  return (
    <div className="p-6  min-h-screen flex flex-col items-center">
      <h1 className="text-2xl font-bold text-center mb-6">PDF {success? "Upload Successful !": "Upload"}</h1>
      <div className="bg-white p-8 rounded-lg  w-full max-w-md">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileUpload}
          className="mb-4 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {!success ? (
            <button
            onClick={handleFileSubmit}
            disabled={loading}
            className={`w-full px-4 py-2 bg-blue-500 text-white rounded-lg ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            {loading ? "Processing..." : "Upload"}
          </button>
         
        )
      :
      ""}
        
        
      </div>
    </div>
  );
};

export default FileUpload;