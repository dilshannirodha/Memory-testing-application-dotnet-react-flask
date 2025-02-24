import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext"; // Import the context

const SummarizeText = () => {
  const { option, summary } = useContext(AppContext); // Get `option` and `summary` from context

  // Only render this component if `option` is set to "summary"
  if (option !== "summary") {
    return null; // Don't render anything if option is not "summary"
  }

  return (

      <div className="bg-white p-8 rounded-lg w-full max-w-lg ">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Summarized Text
        </h2>

        {/* Render the summary only if it exists */}
        {summary ? (
          <div className="mt-6">
            <p className="whitespace-pre-wrap bg-gray-100 p-4 rounded-md text-gray-700">
              {summary}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-4">No summary available.</p>
        )}
      </div>

  );
};

export default SummarizeText;
