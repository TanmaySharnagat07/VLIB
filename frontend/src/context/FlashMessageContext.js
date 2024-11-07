// context/FlashMessageContext.js
import React, { createContext, useState, useContext } from "react";

const FlashMessageContext = createContext();

export const useFlashMessage = () => useContext(FlashMessageContext);

export const FlashMessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const clearMessage = () => setMessage(null);

  return (
    <FlashMessageContext.Provider value={{ message, setMessage, clearMessage }}>
      {children}
    </FlashMessageContext.Provider>
  );
};
