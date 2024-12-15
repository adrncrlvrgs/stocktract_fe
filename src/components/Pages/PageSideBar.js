import React, { useState } from "react";
import { IconFA } from "components/Icons";
import { useAuth } from "context/AuthContext";
import { useNavItems } from "context/NavContext";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openAccordion, setOpenAccordion] = useState(null); 
  const { logout } = useAuth();
  const navItems = useNavItems();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleAccordionToggle = (index) => {
    setOpenAccordion(openAccordion === index ? null : index); 
  };

  return (
    <aside
      className={`${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 text-white h-screen flex flex-col transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-4">
        <button onClick={toggleSidebar}>
          <IconFA name="bars" className="fa-lg" />
        </button>
      </div>
      <nav className="flex-1 overflow-y-auto">
        <ul>
          {navItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.subItems ? (
                <>
                  {/* Main Accordion Item */}
                  <li
                    className="p-4 hover:bg-gray-700 flex items-center space-x-4 cursor-pointer"
                    onClick={() => handleAccordionToggle(index)}
                  >
                    <IconFA name={item.icon} />
                    {isOpen && (
                      <span className="flex-grow">{item.label}</span>
                    )}
                    {isOpen && (
                      <IconFA
                        name={openAccordion === index ? "chevron-up" : "chevron-down"}
                        className="transition-transform"
                      />
                    )}
                  </li>
                  {/* Sub-items */}
                  {openAccordion === index && isOpen && (
                    <ul className="relative pl-8 space-y-2">
                      {/* Vertical line to connect sub-items */}
                      <div className="absolute left-4 top-0 h-full border-l-2 border-gray-600"></div>
                      {item.subItems.map((subItem, subIndex) => (
                        <li key={subIndex} className="relative">
                          <Link
                            to={subItem.path}
                            className="p-4 hover:bg-gray-700 flex items-center space-x-4"
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
                // Render regular navigation items without sub-items
                <li className="p-4 hover:bg-gray-700 flex items-center space-x-4">
                  <Link
                    to={item.path}
                    className="flex items-center w-full space-x-4"
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
            className="p-4 hover:bg-gray-700 flex items-center space-x-4 cursor-pointer"
            onClick={logout}
          >
            <IconFA name="right-from-bracket" />
            {isOpen && <span>Logout</span>}
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
