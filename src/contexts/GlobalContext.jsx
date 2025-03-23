import React, { createContext, useState } from "react";
import { coachesData } from "../../lib/BookingsData";

// Create the context
export const GlobalContext = createContext();

// Create the provider component
export const GlobalProvider = ({ children }) => {
  // Initialize the global state
  const [data, setData] = useState(JSON.parse(JSON.stringify(coachesData())));

  return (
    <GlobalContext.Provider value={{ data, setData }}>
      {children}
    </GlobalContext.Provider>
  );
};