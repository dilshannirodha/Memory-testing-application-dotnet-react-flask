import React, { useState } from "react";
import FileUpload from "../components/FileUpload";
import TextInput from "../components/TextInput";
import ImageUpload from "./ImageUpload";

const SelectMaterial = () => {
  const [mode, setMode] = useState("file"); // State to track the selected mode

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Select Your Study Material
      </h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => setMode("file")}
          className={`px-4 py-2 rounded-md ${
            mode === "file"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition duration-300`}
        >
          PDF
        </button>
        <button
          onClick={() => setMode("image")}
          className={`px-4 py-2 rounded-md ${
            mode === "image"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          } transition duration-300`}
        >
          Image
        </button>
      </div>

      {/* Display the Relevant Component */}
      {mode === "file" && <FileUpload />}
      {mode === "image" && <ImageUpload />}
    </div>
  );
};

export default SelectMaterial;