import React, { useState, useEffect, useRef } from "react";
import { Input } from "components/Input";
import { useNavigate, useLocation } from "react-router-dom";
import { IconFA } from "components/Icons";

export const SearchStocks = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  suggestions,
}) => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setSearchHistory(history);
  }, []);

  const updateSearchHistory = (term) => {
    if (term) {
      const updatedHistory = [
        term,
        ...searchHistory.filter((item) => item !== term),
      ].slice(0, 5);
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
  };

  const handleSearchAction = (e) => {
    if (e.key === "Enter") {
      updateSearchHistory(searchTerm);
      handleSearch(e);
    }
  };

  const handleItemClick = (item) => {
    setSearchTerm(item);
    updateSearchHistory(item);
    navigate(`/stocks/stocks-management?search=${item}`);
  };

  useEffect(() => {
    if (searchHistory.length > 0 || suggestions.length > 0) {
    } else {
      setIsDropdownOpen(false);
    }
  }, [searchHistory, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !event.target.closest("input") // Ensure the input field is not the target
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex-grow mx-5 px-10 max-w-2xl relative">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search stocks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleSearchAction}
          onFocus={() => setIsDropdownOpen(true)}
          className="w-full px-4 py-2 rounded-lg bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white"
        />

        {isDropdownOpen &&
          (searchHistory.length > 0 || suggestions.length > 0) && (
            <div
              ref={dropdownRef}
              className="absolute top-full mt-2 w-full bg-white rounded-md shadow-lg z-50"
            >
              {!searchTerm &&
                searchHistory.map((historyItem, index) => (
                  <div
                    key={`history-${index}`}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleItemClick(historyItem)}
                  >
                    <IconFA
                      name="fa-clock-rotate-left"
                      className="h-4 w-4 mr-2 text-gray-500"
                    />{" "}
                    {/* Clock icon */}
                    {historyItem}
                  </div>
                ))}
              {/* Display Suggestions */}
              {suggestions.map((stock) => {
                const matchIndex = stock.item
                  .toLowerCase()
                  .indexOf(searchTerm.toLowerCase());
                return (
                  <div
                    key={stock.stockID}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer rounded-md"
                    onClick={() => handleItemClick(stock.item)}
                  >
                    {matchIndex >= 0 ? (
                      <>
                        {stock.item.substring(0, matchIndex)}
                        <span className="font-semibold">
                          {stock.item.substring(
                            matchIndex,
                            matchIndex + searchTerm.length
                          )}
                        </span>
                        {stock.item.substring(matchIndex + searchTerm.length)}
                      </>
                    ) : (
                      stock.item
                    )}
                  </div>
                );
              })}
            </div>
          )}
      </div>
    </div>
  );
};
