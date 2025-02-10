import React, { useContext } from "react";
import AppContext from "../contexts/AppContext"; // Import your context

const ContentSelector = () => {
  const { option, setOption } = useContext(AppContext); // Use context to get and set the option

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;
    setOption(selectedOption); // Update the context with the selected option
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg w-fit">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Choose Reading Option
      </h2>
      <div className="flex flex-col space-y-4">
        {/* Option Selection */}
        <div className="flex justify-around mb-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="all"
              checked={option === "all"}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">All Content</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              value="summary"
              checked={option === "summary"}
              onChange={handleOptionChange}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-gray-700">Summary</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ContentSelector;
