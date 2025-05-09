import React, { useContext } from "react";
import AppContext from "../contexts/AppContext"; 
import SelectMaterial from "../components/SelectMaterial";
import PDFViewer from "../components/PDFViewer";
import AnswerComponent from "../components/AnswerComponent";
import StartComponent from "../components/StartComponent";
import Evaluation from "../components/Evaluation";
import { useNavigate } from "react-router-dom";


const Home = () => {
  const {setSelected,setFinished,setSubmitted,submitted,finished,showAnswerComponent, setShowAnswerComponent,selected,showButtons,showStartComponent,selectpdf, setSelectpdf,showPDF, setShowPDF, setStart, successUpload, setSuccessUpload} = useContext(AppContext);
  const navigate = useNavigate();


  const startReading = () =>{
    setStart(true);
    setShowAnswerComponent(false);
    setSelectpdf(false);
    setShowPDF(true);
    setSuccessUpload(false);
   
    
  }
 
  const uploadMaterial = () =>{
    setStart(false);
    setSelectpdf(true);
    setShowPDF(false);
    setShowAnswerComponent(false);
    setSubmitted(false);
    setFinished(false);
    navigate("/"); 

  }

 
   
  const readAgain = () => {
    setShowPDF(true);
    setShowAnswerComponent(false);
    setSubmitted(false);
    setFinished(false);
    setSelected(true);
  }

  return (
    <div className="flex flex-col min-h-screen" style={{ backgroundImage: "url('/path-to-image.jpg')"}}>
      
      <div className="flex justify-center">

        
        {showStartComponent && (<StartComponent />)}
        { selectpdf && ( <SelectMaterial />)}
        { showPDF && ( <PDFViewer />)}
        {showAnswerComponent && ( <AnswerComponent />)}
        {submitted && (<Evaluation/>)}
      </div>

      {showButtons && (
        <div className="fixed bottom-0  p-4">
        <div className="flex gap-4 justify-center">
          
          {successUpload && (
            <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            onClick={startReading} 
          >
            Start Reading
          </button>
          )}
          {finished && (
            <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onClick={readAgain} 
          >
            Back to read
          </button>
          ) 
          }
          
          <button
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onClick={uploadMaterial} 
          >
            Upload another pdf
          </button>
        </div>
        </div>
      )}
      
    </div>
  );
};

export default Home;