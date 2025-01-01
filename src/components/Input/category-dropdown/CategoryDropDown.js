import React from "react";
import Input from "../Input";
import useCategories from "./useGetCategories";

const CategoryDropdown = ({ name, error, defaultValue = "", ...props }) => {
  const { categories, isLoading, error: fetchError } = useCategories();

  if (fetchError) return <p className="text-red-500">Error: {fetchError}</p>;

  return (
    <Input
      type="select"
      name={name}
      error={error}
      defaultValue={defaultValue} 
      {...props}
    >
      {isLoading ? (
        <option value="">
          Loading categories...
        </option>
      ) : (
        <>
          <option value="" disabled>
            Select a category
          </option>
          {categories.map((category) => (
            <option key={category.categoryID} value={category.name}>
              {category.name}
            </option>
          ))}
        </>
      )}
    </Input>
  );
};

export default CategoryDropdown;
