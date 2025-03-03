import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

const PDFViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
   // Track if a page is selected
  const {setFinished,setShowPDF,setShowAnswerComponent,selected,setSelected, images, setText } = useContext(AppContext);

  // Handle page navigation
  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < images.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Toggle page selection mode
  const toggleSelection = () => {
    setSelected(!selected);
    if (selected) {
      setText(""); // Clear the extracted text when selecting a new page
    }
  };

  // Function to send the selected page image to the OCR API
  const extractTextFromImage = async () => {
    try {
      const imageUrl = `http://localhost:5001${images[currentPage - 1]}`;

      // Fetch the image as a Blob
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], "image.jpg", { type: "image/jpeg" });

      // Prepare FormData
      const formData = new FormData();
      formData.append("file", file);

      // Send to OCR API
      const ocrResponse = await fetch("http://localhost:5001/api/ocr", {
        method: "POST",
        body: formData,
      });

      if (ocrResponse.ok) {
        const data = await ocrResponse.json();
        setText(data.text); // Store OCR result in context
        setSelected(true); // Hide Next & Previous buttons after selection
      } else {
        console.error("Failed to extract text from image.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const finishReading = () =>{
    setShowAnswerComponent(true);
    setShowPDF(false);
    setFinished(true);
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        {selected ? "Read !" : "Select a Page to Read"}
      </h1>
      {images.length > 0 && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          
          {!selected && (
            <h2 className="text-xl font-semibold text-center mb-4">
            Page {currentPage} of {images.length}
          </h2>
          )}
          <div className="flex justify-center mb-6">
            <img
              src={`http://localhost:5001${images[currentPage - 1]}`}
              alt={`Page ${currentPage}`}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="flex justify-center gap-4">
            {!selected && (
              <>
                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                    currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                <button
                  onClick={goToNextPage}
                  disabled={currentPage === images.length}
                  className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${
                    currentPage === images.length ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </>
            )}
            <button
              onClick={selected ? toggleSelection : extractTextFromImage}
              className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              {selected ? "Select Another Page" : "Select"}
            </button>
            {selected && (
              <button 
              onClick={finishReading}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Finish reading
            </button>
            )}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;
