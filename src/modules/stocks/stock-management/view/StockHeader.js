import React from "react";
import { InputSearch } from "components/SearchBar";

import StockCreateAction from "./StockCreateAction";

const StockHeader = ({ search, handleSearchInputChange, toggleCreate }) => {
  return (
    <div className="mb-2">
      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} />
        </div>
        <StockCreateAction toggle={toggleCreate} />
      </div>
    </div>
  );
};

export default StockHeader;
