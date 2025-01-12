import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "context/AuthContext";
import { Avatar } from "components/Avatar";
import { Input } from "components/Input";
import { SearchStocks } from "components/SearchBar/SearchStock/SearchStocks";
import { useSearchStocks } from "components/SearchBar/SearchStock/useSearchStocks";

export default function PageHeader() {
  const { user, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { searchTerm, setSearchTerm, suggestions, handleSearch } = useSearchStocks();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false); 
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-indigo-600 animate-gradient-x text-white shadow-lg w-full">
      <div className="bg-white bg-opacity-10 backdrop-blur-md border-b border-white border-opacity-20">
        <div className="flex justify-between items-center py-4 px-6 mx-auto">

          <div className="text-2xl font-bold tracking-tight flex items-center space-x-2">
            {/* <img
              src="/logo.png" 
              alt="StocksTract Logo"
              className="h-8 w-8"
            /> */}
            <span>StocksTract</span>
          </div>

          <SearchStocks
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearch={handleSearch}
            suggestions={suggestions}
          />

          <div className="relative flex items-center space-x-4" ref={dropdownRef}>
            <button className="p-2 text-white hover:bg-white hover:bg-opacity-10 rounded-full transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button>

            <div className="text-sm font-medium">{user?.userData.name}</div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="focus:outline-none"
            >
              <Avatar
                src={user?.userData.profileImageUrl}
                alt="avatar"
                className="w-10 h-10 border-2 border-white rounded-full cursor-pointer hover:opacity-80 transition-opacity"
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg z-50">
                <div className="py-1">
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}