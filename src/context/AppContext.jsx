import React, { createContext, useState } from "react";

export const AppContext = createContext();

//TODO: pasar todo el manejo de state al Context.

export function AppProvider({ children }) {
  const [cart, setCart] = useState([]);

  return <AppContext.Provider value={{ cart }}>{children}</AppContext.Provider>;
}
