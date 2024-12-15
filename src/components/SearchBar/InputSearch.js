import React from "react";
import { Input } from "components/Input";
import useSearch from "./useSearch";
import { cn } from "utils/cn";
import { IconFA } from "components/Icons";

const InputSearch = ({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
  ...props
}) => {
  return (
    <div className={cn("relative flex items-center", className)}>
      <span className="absolute left-3 text-gray-500">
        <IconFA name="search" className="fa-sm" />
      </span>
      <Input
        type="text"
        defaultValue={value}
        onChange={onChange}
        placeholder={placeholder}
        className={cn(
          "pl-10 border-gray-300 focus:ring-blue-500 focus:border-blue-500",
          className
        )}
        {...props}
      />
    </div>
  );
};

export default InputSearch;
