import React from "react";
import Input from "../Input";

import useCategories from "./useGetCategories";

const CategoryDropdown = ({ name, error, defaultValue = "", ...props }) => {
  const { categories, isLoading, error: fetchError } = useCategories();

  if (isLoading) return <p>Loading categories...</p>;
  if (fetchError) return <p className="text-red-500">Error: {fetchError}</p>;

  return (
    <Input type="select" name={name} error={error} defaultValue={defaultValue} {...props}>
      <option value="">Select a category</option>
      {categories.map((category) => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </Input>
  );
};

export default CategoryDropdown;


