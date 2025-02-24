import React, { useState, useEffect, useContext } from "react";
import AppContext from "../contexts/AppContext"; 

const Countdown = () => {
  const { time, start } = useContext(AppContext); 
  const [secondsRemaining, setSecondsRemaining] = useState(time * 60); 

  useEffect(() => {
    if (!start || secondsRemaining <= 0) return; 

    const interval = setInterval(() => {
      setSecondsRemaining((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(interval); 
  }, [start, secondsRemaining]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  // Get the formatted time
  const timeText = formatTime(secondsRemaining);

  // Calculate the width based on the length of the time text
  const containerWidth = `${timeText.length * 1.5}rem`; // Adjust the multiplier as needed

  return (
    <div
      className="mx-auto p-4 bg-white rounded-lg text-center" // Removed shadow-lg
      style={{ width: containerWidth }} // Set the width dynamically
    >
      <div>
        <p className="text-4xl font-bold text-blue-600">{timeText}</p>
        <p className="text-gray-600 mt-2">Remaining Time</p>
      </div>
    </div>
  );
};

export default Countdown;