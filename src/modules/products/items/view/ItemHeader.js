import React from "react";
import { InputSearch } from "components/SearchBar";
import { IconFA } from "components/Icons";

const ItemHeader = ({
  search,
  handleSearchInputChange,
  viewMode,
  toggleViewMode,
}) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} />
        </div>
        <div className="flex justify-end items-center w-1/4">
          <div className="relative group">
            <button
              onClick={toggleViewMode}
              className="p-4 rounded hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label={
                viewMode === "table"
                  ? "Switch to Grid View"
                  : "Switch to Table View"
              }
            >
              {viewMode === "table" ? (
                <IconFA name="th-large" className="w-5 h-5 text-slate-800" />
              ) : (
                <IconFA name="table-cells" className="w-5 h-5 text-slate-800" />
              )}
            </button>
            <div className="absolute right-full top-1/2 transform -translate-y-1/2 mr-2 px-2 py-1 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity text-xs whitespace-nowrap">
              {viewMode === "table" ? "Switch to Grid View" : "Switch to Table View"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemHeader;