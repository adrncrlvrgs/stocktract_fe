import React from "react";
import PropTypes from "prop-types";
import { cn } from "utils/cn";

const Input = ({
  name,
  type = "text",
  placeholder,
  required = false,
  autoComplete,
  className = "",
  error,
  ...props
}) => {
  return (
    <React.Fragment>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        className={cn(
          "bg-gray-200 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent",
          className
        )}
        {...props}
      />
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </React.Fragment>
  );
};

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
};

export default Input;
