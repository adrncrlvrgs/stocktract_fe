import React from "react";
import Input from "../Input";

const PriceInput = ({ name, placeholder, defaultValue, error, ...props }) => {
  return (
    <div className="flex items-center">
      <div className="flex items-center justify-center w-10 h-10 border border-r-0 rounded-l-md bg-gray-100 text-gray-600">
        ₱
      </div>
      <Input
        name={name}
        type="number"
        placeholder={placeholder}
        defaultValue={defaultValue}
        className="flex-1 p-2.5 rounded-l-none rounded-r-md border-gray-300"
        error={error}
        {...props}
      />
    </div>
  );
};

export default PriceInput;
