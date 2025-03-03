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
import StartComponent from "../components/StartComponent";
import Evaluation from "../components/Evaluation";
const Home = () => {
  const {setFinished,setSubmitted,submitted,finished,showAnswerComponent, setShowAnswerComponent,selected,showButtons,showStartComponent,selectpdf, setSelectpdf,showPDF, setShowPDF, setShowTimer,showTimer,images, text, start, setStart, time } = useContext(AppContext);
  


  const startReading = () =>{
    setStart(true);
    setShowAnswerComponent(false);
    setSelectpdf(false);
    setShowPDF(true);
   
    
  }
 
  const uploadMaterial = () =>{
    setStart(false);
    setSelectpdf(true);
    setShowPDF(false);
    setShowTimer(false);
    setShowAnswerComponent(false);
    setSubmitted(false);
    setFinished(false);
  }

 
   
  const readAgain = () => {
    setShowPDF(true);
    setShowAnswerComponent(false);
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "url('/path-to-image.jpg')"}}>
      {/* Main Content */}
      <div className="flex-1 p-4">

        {/* Components */}
        {showStartComponent && (<StartComponent />)}
        { selectpdf && ( <SelectMaterial />)}
        { showPDF && ( <PDFViewer />)}
       { showTimer && (<TimeSelector />) }
        {showAnswerComponent && ( <AnswerComponent />)}
        {submitted && (<Evaluation/>)}
      </div>

      {/* Fixed Buttons at the Bottom */}
      {showButtons && (
        <div className="fixed bottom-0  p-4">
        <div className="flex gap-4 justify-center">
          
          {!selected  && (
            <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onClick={startReading} // Example functionality
          >
            Start Reading
          </button>
          )}
          {finished && (
            <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onClick={readAgain} // Example functionality
          >
            Back to read
          </button>
          ) 
          }
          
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onClick={uploadMaterial} // Example functionality
          >
            Upload Material
          </button>
        </div>
        </div>
      )}
      
    </div>
  );
};

export default Home;