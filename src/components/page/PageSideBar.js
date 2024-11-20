import React, { useState } from "react";
import PropTypes from "prop-types";
import { IconFA } from "components/Icons";

const Sidebar = ({ navItems }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
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
      <nav className="flex-1">
        <ul>
          {navItems.map((item, index) => (
            <li
              key={index}
              className="p-4 hover:bg-gray-700 flex items-center space-x-4"
            >
              <IconFA name={item.icon} />
              {isOpen && <span>{item.label}</span>}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

Sidebar.propTypes = {
  navItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Sidebar;
