import React from "react";
import { Input } from "components/Input";
import useSearch from "./useSearch";
import { cn } from "utils/cn";

const InputSearch = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ...props
}) => {
  return (
    <Input
      type="text"
      defaultValue={value}
      onChange={onChange}
      placeholder={placeholder}
      className={cn(
        "border-gray-300 focus:ring-blue-500 focus:border-blue-500",
        className
      )}
      {...props} 
    />
  );
};

export default InputSearch;
