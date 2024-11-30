import React, { createContext, useContext } from "react";
import { navItems } from "constants/navItems";

const NavItemsContext = createContext();

export const useNavItems = () => useContext(NavItemsContext);

export const NavItemsProvider = ({ children }) => {
  return (
    <NavItemsContext.Provider value={navItems}>
      {children}
    </NavItemsContext.Provider>
  );
};
