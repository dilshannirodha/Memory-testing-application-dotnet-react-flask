import React, { useState, useContext } from "react";
import AppContext from "../contexts/AppContext"; // Import the context

const TimeSelector = () => {
  const { setTime } = useContext(AppContext); // Use the context to set the time
  const [customTime, setCustomTime] = useState(""); // State for custom time input
  const [selectedOption, setSelectedOption] = useState("fixed"); // State for selected option (fixed or custom)
  const [fixedTime, setFixedTime] = useState("5"); // State for fixed time selection

  // Handle custom time input change
  const handleCustomTimeChange = (event) => {
    setCustomTime(event.target.value);
  };

  // Handle fixed time selection change
  const handleFixedTimeChange = (event) => {
    setFixedTime(event.target.value);
  };

  // Handle option change (fixed or custom)
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const time = selectedOption === "fixed" ? fixedTime : customTime;
    setTime(time); // Update the time in the context
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
        Select Time
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col space-y-4">
          {/* Option Selection */}
          <div className="flex justify-around mb-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="fixed"
                checked={selectedOption === "fixed"}
                onChange={handleOptionChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Fixed Time</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="custom"
                checked={selectedOption === "custom"}
                onChange={handleOptionChange}
                className="form-radio h-5 w-5 text-blue-600"
              />
              <span className="ml-2 text-gray-700">Custom Time</span>
            </label>
          </div>

          {/* Fixed Time Dropdown */}
          {selectedOption === "fixed" && (
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700">Select Fixed Time (minutes):</label>
              <select
                value={fixedTime}
                onChange={handleFixedTimeChange}
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="5">5 minutes</option>
                <option value="10">10 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
              </select>
            </div>
          )}

          {/* Custom Time Input */}
          {selectedOption === "custom" && (
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700">Enter Custom Time (minutes):</label>
              <input
                type="number"
                value={customTime}
                onChange={handleCustomTimeChange}
                placeholder="Enter time in minutes"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="1"
                required
              />
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Set Time
          </button>
        </div>
      </form>
    </div>
  );
};

export default TimeSelector;
