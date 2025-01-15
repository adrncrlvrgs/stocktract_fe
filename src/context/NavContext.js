import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import { navItems } from "constants/navItems";

const NavItemsContext = createContext();

export const useNavItems = () => useContext(NavItemsContext);

export const NavItemsProvider = ({ children }) => {
  const { user } = useAuth();
  const [filteredNavItems, setFilteredNavItems] = useState([]);

  useEffect(() => {
    if (user) {
      const filterNavItems = (items) => {
        return items.filter((item) => {
          if (item?.subItems) {
            item.subItems = item?.subItems.filter((subItem) => {
              if (subItem?.requiredRole) {
                return subItem?.requiredRole === user?.role;
              }
              return true;
            });

            return item.subItems.length > 0;
          }

          if (item.requiredRole) {
            return item.requiredRole === user?.role;
          }
          return true;
        });
      };

      const filteredItems = filterNavItems(navItems);
      setFilteredNavItems(filteredItems);
    }
  }, [user]);

  return (
    <NavItemsContext.Provider value={filteredNavItems}>
      {children}
    </NavItemsContext.Provider>
  );
};
