import React, { createContext, useState } from 'react';

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [time, setTime] = useState(0);
  const [option, setOption ] = useState("all");
  const [start, setStart] = useState(false);
  

  return (
    <AppContext.Provider value={{ 
        time, setTime,
        option, setOption,
        start, setStart
        
        }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
