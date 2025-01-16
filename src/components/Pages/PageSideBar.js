import React, { useState } from "react";
import { IconFA } from "components/Icons";
import { useAuth } from "context/AuthContext";
import { useNavItems } from "context/NavContext";
import { Link, useLocation } from "react-router-dom";
import { Spinner } from "components/Spinner";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const { logout, loading } = useAuth();
  const navItems = useNavItems();
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAccordionToggle = (key) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const isActive = (path) => location.pathname === path;

  if (loading) return <Spinner />;

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-900 text-white h-screen flex flex-col transition-all duration-500 shadow-lg`}
    >
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <IconFA
            name="bars"
            className="fa-lg text-gray-400 hover:text-white transition-colors duration-200"
          />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {Object.entries(navItems).map(([key, item]) => (
            <React.Fragment key={key}>
              {item.subItems ? (
                <>
                  <li
                    className={`group p-4 flex items-center space-x-4 cursor-pointer transition-colors duration-200 hover:bg-gray-800 ${
                      Object.values(item.subItems).some((subItem) =>
                        isActive(subItem.path)
                      )
                        ? "bg-gray-800 text-white"
                        : ""
                    }`}
                    onClick={() => handleAccordionToggle(key)}
                    aria-expanded={openAccordion === key}
                    aria-controls={`accordion-${key}`}
                  >
                    <IconFA
                      name={item.icon}
                      className="text-gray-400 group-hover:text-white"
                    />
                    {isOpen && (
                      <span className="flex-grow text-gray-300 group-hover:text-white transition-colors duration-200">
                        {item.label}
                      </span>
                    )}
                    {isOpen && (
                      <IconFA
                        name={
                          openAccordion === key ? "chevron-up" : "chevron-down"
                        }
                        className="text-gray-400 group-hover:text-white transition-transform"
                      />
                    )}
                  </li>

                  {openAccordion === key && isOpen && (
                    <ul
                      id={`accordion-${key}`}
                      className="pl-8 mt-2 space-y-2 border-l border-gray-700"
                    >
                      {Object.entries(item.subItems).map(
                        ([subKey, subItem]) => (
                          <li key={subKey}>
                            <Link
                              to={subItem.path}
                              className={`p-3 flex items-center space-x-4 rounded-lg transition-colors duration-200 ${
                                isActive(subItem.path)
                                  ? "bg-gray-700 text-white"
                                  : "text-gray-400 hover:text-white hover:bg-gray-800"
                              }`}
                            >
                              <IconFA name={subItem.icon} />
                              <span>{subItem.label}</span>
                            </Link>
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </>
              ) : (
                <li
                  className={`group p-4 hover:bg-gray-800 flex items-center space-x-4 ${
                    isActive(item.path) ? "bg-gray-800 text-white" : ""
                  }`}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center w-full space-x-4 ${
                      isActive(item.path)
                        ? "text-white"
                        : "text-gray-400 group-hover:text-white"
                    }`}
                  >
                    <IconFA name={item.icon} />
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              )}
            </React.Fragment>
          ))}

          {/* Logout Option */}
          <li
            className="p-4 hover:bg-gray-800 flex items-center space-x-4 cursor-pointer group"
            onClick={logout}
          >
            <IconFA
              name="right-from-bracket"
              className="text-gray-400 group-hover:text-white"
            />
            {isOpen && (
              <span className="text-gray-300 group-hover:text-white">
                Logout
              </span>
            )}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
