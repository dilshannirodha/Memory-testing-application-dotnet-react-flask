import React, { useContext, useState } from "react";
import AppContext from "../contexts/AppContext"; // Import your context
import TimeSelector from "../components/TimeSelector";
import Countdown from "../components/Countdown";
import SelectMaterial from "../components/SelectMaterial";
import TextInput from "../components/TextInput";
import OcrComponent from "../components/OcrComponent";
import SummarizeText from "../components/SummarizeText";
import PDFViewer from "../components/PDFViewer";
import AnswerComponent from "../components/AnswerComponent";

const Home = () => {
  const { images, text, start, setStart, time } = useContext(AppContext);
  const [showPDF, setShowPDF ] = useState(false);
  const [showAnswerComponent, setShowAnswerComponent] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
 
  const startReading = () =>{
    setStart(true);
    setShowPDF(true);
    setShowTimer(true);
    
  }
  const finishReading = () =>{
    setStart(false);
    setShowAnswerComponent(true);
  }
  const uploadMaterial = () =>{

  }

  const evaluate = () => {

  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Main Content */}
      <div className="flex-1 p-4">
        {/* Display text and time from context */}
        <div className="mb-4">
          <p className="text-lg font-semibold">Text: {text}</p>
          <p className="text-lg font-semibold">Time: {time}</p>
        </div>

        {/* Components */}
        <SelectMaterial />
        <PDFViewer />
        <TimeSelector />
        <AnswerComponent />
      </div>

      {/* Fixed Buttons at the Bottom */}
      <div className="fixed bottom-0  p-4">
        <div className="flex gap-4 justify-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onClick={startReading} // Example functionality
          >
            Start Reading
          </button>
          <button
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition-all"
            onClick={finishReading} // Example functionality
          >
            Finish Reading
          </button>
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onClick={evaluate} // Example functionality
          >
            Evaluate
          </button>
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onClick={uploadMaterial} // Example functionality
          >
            Upload Material
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;