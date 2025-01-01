import React from "react";
import { InputSearch } from "components/SearchBar";

const ItemHeader = ({ search, handleSearchInputChange }) => {
  return (
    <div className="mb-2">
      <h1 className="text-2xl font-semibold mb-1">Product-item Management</h1>
      <p className="text-gray-400">Manage your product items here</p>

      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} />
        </div>
      </div>
    </div>
  );
};

export default ItemHeader;
