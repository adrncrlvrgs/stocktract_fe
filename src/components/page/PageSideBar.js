import React, { useState } from "react";
import { IconFA } from "components/Icons";

export default function PageSideBar() {
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
        <IconFA name="bars" className="fa-lg mr-1" />

        </button>
      </div>
      <nav className="flex-1">
        <ul>
          <li className="p-4 hover:bg-gray-700 flex items-center space-x-4">
            <IconFA name="home" />
            {isOpen && <span>Home</span>}
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center space-x-4">
            <IconFA name="user" />
            {isOpen && <span>Profile</span>}
          </li>
          <li className="p-4 hover:bg-gray-700 flex items-center space-x-4">
            <IconFA name="cog" />
            {isOpen && <span>Settings</span>}
          </li>
        </ul>
      </nav>
    </aside>
  );
}
