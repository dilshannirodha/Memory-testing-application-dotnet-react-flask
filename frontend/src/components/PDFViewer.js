import React, { useState, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";

const PDFViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { setFinished, setShowPDF, setShowAnswerComponent, selected, setSelected, images, setText } = useContext(AppContext);

  // Load last viewed page from localStorage on component mount
  useEffect(() => {
    const savedPage = localStorage.getItem('lastViewedPage');
    if (savedPage && images.length > 0) {
      const page = Math.min(parseInt(savedPage), images.length);
      setCurrentPage(page);
    }
  }, [images]);

  // Save current page to localStorage whenever it changes
  useEffect(() => {
    if (images.length > 0) {
      localStorage.setItem('lastViewedPage', currentPage.toString());
    }
  }, [currentPage, images]);

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

  const toggleSelection = () => {
    setSelected(!selected);
    if (selected) setText("");
  };

  const extractTextFromImage = async () => {
    try {
      const imagePath = images[currentPage - 1];
      if (!imagePath) throw new Error("No image path found");
      
      const imageUrl = `http://localhost:5001${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
      
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");
      
      const blob = await response.blob();
      const file = new File([blob], `page_${currentPage}.jpg`, { type: "image/jpeg" });

      const formData = new FormData();
      formData.append("file", file);

      const ocrResponse = await fetch("http://localhost:5001/api/ocr", {
        method: "POST",
        body: formData,
      });

      if (!ocrResponse.ok) throw new Error("OCR processing failed");
      
      const result = await ocrResponse.json();
      if (!result.text) throw new Error("No text found in response");
      
      setText(result.text);
      setSelected(true);
    } catch (error) {
      console.error("OCR Error:", error);
      alert(`Error processing image: ${error.message}`);
    }
  };

  const finishReading = () => {
    setShowAnswerComponent(true);
    setShowPDF(false);
    setFinished(true);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <h1 className="text-3xl font-bold text-center py-4">
        {selected ? "Read and understand the content" : "Select a page to focus on"}
      </h1>

      <div className="flex-grow flex justify-center items-center p-4 overflow-auto">
        {images.length > 0 && (
          <div className="max-w-full max-h-full">
            <img
              src={`http://localhost:5001${images[currentPage - 1]}`}
              alt={`Page ${currentPage}`}
              className="max-h-[80vh] object-contain mx-auto"
              onError={(e) => {
                e.target.onerror = null; 
                e.target.src = "/image-placeholder.png";
              }}
            />
          </div>
        )}
      </div>

      <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-xl border border-gray-200 flex gap-2 z-10">
        {!selected && (
          <>
            <button
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              ←
            </button>
            <span className="flex items-center px-2 font-medium">
              {currentPage}/{images.length}
            </span>
            <button
              onClick={goToNextPage}
              disabled={currentPage === images.length}
              className={`w-10 h-10 flex items-center justify-center rounded-full ${
                currentPage === images.length ? "bg-gray-300" : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
            >
              →
            </button>
          </>
        )}

        <button
          onClick={selected ? toggleSelection : extractTextFromImage}
          className={`px-4 py-2 rounded-lg ${
            selected ? "bg-yellow-500 hover:bg-yellow-600" : "bg-green-500 hover:bg-green-600"
          } text-white font-medium`}
        >
          {selected ? "Change Page" : "Select This Page"}
        </button>

        {selected && (
          <button 
            onClick={finishReading}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg"
          >
            Finish reading
          </button>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;