import React from "react";
import { InputSearch } from "components/SearchBar";

import CategoryCreateAction from "./CategoryCreateAction";

const CategoryHeader = ({ search, handleSearchInputChange, toggleCreate }) => {
  return (
    <div className="mb-2">
      <h1 className="text-2xl font-semibold mb-1">Category Management</h1>
      <p className="text-gray-500 text-sm mb-4">
        Manage the categories in the system, create new categories, or search
        existing categories.
      </p>

      <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} placeholder="Search Category by name and Id.." />
        </div>
        <CategoryCreateAction toggle={toggleCreate} />
      </div>
    </div>
  );
};

export default CategoryHeader;
