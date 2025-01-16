import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "context/AuthContext";
import { navItems } from "constants/navItems";

const NavItemsContext = createContext();

export const useNavItems = () => useContext(NavItemsContext);

export const NavItemsProvider = ({ children }) => {
  const { user } = useAuth();
  const [filteredNavItems, setFilteredNavItems] = useState({});

  useEffect(() => {
    if (user) {
      const filterNavItems = (items, userRole) => {
        return Object.keys(items).reduce((acc, key) => {
          const item = items[key];

          if (item.subItems) {
            const filteredSubItems = Object.keys(item.subItems).reduce(
              (subAcc, subKey) => {
                const subItem = item.subItems[subKey];
                if (
                  !subItem.requiredRole ||
                  subItem.requiredRole === userRole
                ) {
                  subAcc[subKey] = subItem;
                }

                return subAcc;
              },
              {}
            );

            if (Object.keys(filteredSubItems).length > 0) {
              acc[key] = { ...item, subItems: filteredSubItems };
            }
          } else if (!item.requiredRole || item.requiredRole === userRole) {
            acc[key] = item;
          }

          return acc;
        }, {});
      };

      const filteredItems = filterNavItems(navItems, user.role);
      setFilteredNavItems(filteredItems);
    }
  }, [user]);

  return (
    <NavItemsContext.Provider value={filteredNavItems}>
      {children}
    </NavItemsContext.Provider>
  );
};
