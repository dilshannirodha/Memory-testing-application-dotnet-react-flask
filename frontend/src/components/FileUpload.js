import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    // Validate file type
    const validTypes = [
      "application/pdf", // PDF files
      "text/plain", // Text files
      "image/jpeg", // JPEG images
      "image/png", // PNG images
      "image/gif", // GIF images
    ];

    if (!validTypes.includes(file.type)) {
      setMessage("Invalid file type. Only PDF, text, and image files are allowed.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData

    try {
      const response = await axios.post(
        "http://localhost:5000/api/FileUpload/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Upload failed. Try again.");
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg w-fit">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Upload a File
      </h2>
      <div className="flex flex-col space-y-4">
        {/* File Input */}
        <input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.txt,.jpg,.jpeg,.png,.gif" // Allow only PDF, text, and image files
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Upload
        </button>

        {/* Message Display */}
        {message && (
          <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
