import React, { useState } from "react";
import { IconFA } from "components/Icons";
import { useAuth } from "context/AuthContext";
import { useNavItems } from "context/NavContext"; // Import useNavItems
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null);
  const { logout } = useAuth();
  const navItems = useNavItems(); // Get the filtered navItems
  const location = useLocation();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-900 text-white h-screen flex flex-col transition-all duration-500 shadow-lg`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <button onClick={toggleSidebar} aria-label="Toggle Sidebar">
          <IconFA name="bars" className="fa-lg text-gray-400 hover:text-white transition-colors duration-200" />
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.subItems ? (
                <>
                  {/* Main Accordion Item */}
                  <li
                    className={`group p-4 flex items-center space-x-4 cursor-pointer transition-colors duration-200 hover:bg-gray-800 ${
                      item.subItems.some((subItem) => isActive(subItem.path)) ? "bg-gray-800 text-white" : ""
                    }`}
                    onClick={() => handleAccordionToggle(index)}
                    aria-expanded={openAccordion === index}
                    aria-controls={`accordion-${index}`}
                  >
                    <IconFA name={item.icon} className="text-gray-400 group-hover:text-white" />
                    {isOpen && (
                      <span className="flex-grow text-gray-300 group-hover:text-white transition-colors duration-200">
                        {item.label}
                      </span>
                    )}
                    {isOpen && (
                      <IconFA
                        name={openAccordion === index ? "chevron-up" : "chevron-down"}
                        className="text-gray-400 group-hover:text-white transition-transform"
                      />
                    )}
                  </li>

                  {/* Sub-items */}
                  {openAccordion === index && isOpen && (
                    <ul
                      id={`accordion-${index}`}
                      className="pl-8 mt-2 space-y-2 border-l border-gray-700"
                    >
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            to={subItem.path}
                            className={`p-3 flex items-center space-x-4 rounded-lg transition-colors duration-200 ${
                              isActive(subItem.path) ? "bg-gray-700 text-white" : "text-gray-400 hover:text-white hover:bg-gray-800"
                            }`}
                          >
                            <IconFA name={subItem.icon} />
                            <span>{subItem.label}</span>
                          </Link>
                        </li>
                      ))}
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
                      isActive(item.path) ? "text-white" : "text-gray-400 group-hover:text-white"
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
            <IconFA name="right-from-bracket" className="text-gray-400 group-hover:text-white" />
            {isOpen && <span className="text-gray-300 group-hover:text-white">Logout</span>}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;