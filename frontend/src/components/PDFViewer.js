import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext";

const PDFViewer = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { images } = useContext(AppContext); // Use context to access images

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Read</h1>
      {images.length > 0 && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold text-center mb-4">
            Page {currentPage} of {images.length}
          </h2>
          <div className="flex justify-center mb-6">
            <img
              src={`http://localhost:5001${images[currentPage - 1]}`}
              alt={`Page ${currentPage}`}
              className="max-w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="flex justify-center gap-4">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;