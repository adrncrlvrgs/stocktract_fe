import React, { createContext, useContext } from "react";
import { useAuth } from "context/AuthContext";
import { navItems } from "constants/navItems";

const NavItemsContext = createContext();

export const useNavItems = () => useContext(NavItemsContext);

export const NavItemsProvider = ({ children }) => {
  const { user } = useAuth();

  const filterNavItems = (items) => {
    return items.filter((item) => {
      if (item.subItems) {
        item.subItems = item.subItems.filter((subItem) => {
          if (subItem.requiredRole) {
            return subItem.requiredRole === user?.userData.role;
          }
          return true;
        });

        return item.subItems.length > 0;
      }

      if (item.requiredRole) {
        return item.requiredRole === user?.userData.role;
      }
      return true;
    });
  };

  const filteredNavItems = filterNavItems(navItems);

  return (
    <NavItemsContext.Provider value={filteredNavItems}>
      {children}
    </NavItemsContext.Provider>
  );
};
