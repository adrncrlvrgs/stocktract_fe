import React from "react";
import { InputSearch } from "components/SearchBar";

const ItemHeader = ({ search, handleSearchInputChange }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} />
        </div>
      </div>
    </div>
  );
};

export default ItemHeader;
