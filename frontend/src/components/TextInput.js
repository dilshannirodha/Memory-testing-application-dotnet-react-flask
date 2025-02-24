import React, { useState } from "react";
import axios from "axios";

const TextInput = () => {
  const [text, setText] = useState(""); // State to store the text input
  const [message, setMessage] = useState(""); // State to display messages

  const handleTextChange = (event) => {
    setText(event.target.value); // Update the text state
  };

  const handleUpload = async () => {
    if (!text.trim()) {
      setMessage("Please enter some text before uploading.");
      return;
    }

    try {
      // Convert the text to a Blob
      const blob = new Blob([text], { type: "text/plain" });

      // Create a File object from the Blob
      const file = new File([blob], "textfile.txt", { type: "text/plain" });

      // Create FormData and append the file
      const formData = new FormData();
      formData.append("file", file);

      // Send the file to the backend
      const response = await axios.post(
        "http://localhost:5000/api/FileUpload/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Set the content type for file upload
          },
        }
      );

      setMessage(response.data.message); // Display success message
    } catch (error) {
      setMessage("Upload failed. Try again."); // Display error message
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Text Editor
      </h2>
      <div className="flex flex-col space-y-4">
        {/* Text Editor */}
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Enter your text here..."
          className="w-full h-96 p-4 border border-gray-300 rounded-md resize-none outline-none text-lg"
        />

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition duration-300 text-lg"
        >
          Upload Text
        </button>

        {/* Message Display */}
        {message && (
          <p className="mt-4 text-center text-lg text-gray-600">{message}</p>
        )}
      </div>
    </div>
  );
};

export default TextInput;
