import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(true);
  const [text, setText ] = useState("");
  const [images, setImages] = useState([])
  const [messages, setMessages] = useState([]);

  return (
    <AppContext.Provider value={{ 
        time, setTime,
        start, setStart,
        text, setText,
        images,setImages,
        messages, setMessages
        
        }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
