import React, { createContext, useContext } from "react";
import { useAuth } from "context/AuthContext";
import { navItems } from "constants/navItems";

const NavItemsContext = createContext();

export const useNavItems = () => useContext(NavItemsContext);

export const NavItemsProvider = ({ children }) => {
  const { user, loading } = useAuth();

  console.log(navItems);

  const filterNavItems = (items) => {
    const copiedItems = JSON.parse(JSON.stringify(items));
    console.log(copiedItems);
    return copiedItems.filter((item) => {
      if (item?.subItems) {
        const filteredSubItems = item.subItems.filter((subItem) => {
          if (subItem?.requiredRole) {
            return subItem?.requiredRole === user?.role;
          }
          return true;
        });

        item.subItems = filteredSubItems;

        return filteredSubItems.length > 0;
      }

      // For items without subItems, check the requiredRole
      if (item.requiredRole) {
        return item.requiredRole === user?.role;
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
