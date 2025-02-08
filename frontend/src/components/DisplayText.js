import React, { useState } from "react";
import { pdfToText } from "../services/api";

function DisplayText() {
  const [fileId, setFileId] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const handleExtractText = async () => {
    try {
      const response = await pdfToText(fileId);
      setExtractedText(response.data.extracted_text);
    } catch (error) {
      console.error("Error fetching extracted text:", error);
    }
  };

  return (
    <div>
      <h1>PDF Text Extractor</h1>
      <input
        type="text"
        placeholder="Enter File ID"
        value={fileId}
        onChange={(e) => setFileId(e.target.value)}
      />
      <button onClick={handleExtractText}>Extract Text</button>

      <h2>Extracted Text:</h2>
      <pre>{extractedText}</pre>
    </div>
  );
}

export default DisplayText;
