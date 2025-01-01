import React from "react";
import PropTypes from "prop-types";
import Input from "../Input";
import useCategories from "./useGetCategories";

const CategoryDropdown = ({ name, error, defaultValue = "", ...props }) => {
  const { categories, isLoading, error: fetchError } = useCategories();

  const renderOptions = () => {
    if (isLoading) {
      return (
        <option value="" disabled>
          Loading categories...
        </option>
      );
    }

    const placeholderOption = (
      <option value="" disabled>
        Select a category
      </option>
    );

    const categoryOptions = categories.map((category) => (
      <option key={category.categoryID} value={category.name}>
        {category.name}
      </option>
    ));

    if (!defaultValue) {
      return (
        <>
          {placeholderOption}
          {categoryOptions}
        </>
      );
    }

    return (
      <>
        <option value={defaultValue}>{defaultValue}</option>
        {categoryOptions}
      </>
    );
  };

  // Return a clean UI with conditional rendering for errors
  return (
    <>
      {fetchError ? (
        <p className="text-red-500">Error: {fetchError}</p>
      ) : (
        <Input
          type="select"
          name={name}
          error={error}
          defaultValue={defaultValue || ""}
          {...props}
        >
          {renderOptions()}
        </Input>
      )}
    </>
  );
};

// Prop validation for better developer experience
CategoryDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
};

export default CategoryDropdown;
