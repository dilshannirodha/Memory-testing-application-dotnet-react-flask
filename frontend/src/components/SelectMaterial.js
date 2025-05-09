import React, { useState } from "react";
import FileUpload from "../components/FileUpload";


const SelectMaterial = () => {
  const [mode] = useState("file"); 

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Upload your pdf
      </h1>

    
      <div className="flex justify-center space-x-4 mb-6">
        
        
      </div>

      
      {mode === "file" && <FileUpload />}
      
    </div>
  );
};

export default SelectMaterial;