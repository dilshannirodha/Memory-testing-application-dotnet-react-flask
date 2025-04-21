import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [start, setStart] = useState(true);
  const [text, setText ] = useState("");
  const [images, setImages] = useState([])
  const [messages, setMessages] = useState([]);
  const [showPDF, setShowPDF ] = useState(false);
  const [selectpdf, setSelectpdf] = useState(false);
  const [showStartComponent, setShowStartComponent] = useState(true);
  const [showButtons, setShowButtons] = useState(false);
  const [selected, setSelected] = useState(false);
  const [showAnswerComponent, setShowAnswerComponent] = useState(false);
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [userAnswer,setUserAnswer] = useState("");
  const [evaluation, setEvaluation ]  = useState();
  const [successUpload, setSuccessUpload] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  return (
    <AppContext.Provider value={{ 
        start, setStart,
        text, setText,
        images,setImages,
        messages, setMessages,
       showPDF, setShowPDF,
       selectpdf, setSelectpdf,
       showStartComponent, setShowStartComponent,
      showButtons, setShowButtons,
      selected, setSelected,
      showAnswerComponent, setShowAnswerComponent,
      finished, setFinished,
      submitted, setSubmitted,
      userAnswer, setUserAnswer,
      evaluation, setEvaluation,
      isLoggedIn, setIsLoggedIn,
      successUpload, setSuccessUpload
        }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
