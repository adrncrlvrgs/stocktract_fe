import React, { useState } from "react";
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
  defaultValue,
  children,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };
  return (
    <React.Fragment>
      {type === "select" ? (
        <div className="relative">
          <select
            name={name}
            required={required}
            defaultValue={defaultValue}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "bg-gray-200 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
              "appearance-none pr-8",
              className
            )}
            {...props}
          >
            {children}
          </select>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none transition-transform duration-300",
              { "rotate-180": isOpen }
            )}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      ) : (
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          autoComplete={autoComplete}
          required={required}
          defaultValue={defaultValue}
          className={cn(
            "bg-gray-200 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-blue-600 focus:bg-transparent",
            className
          )}
          {...props}
        />
      )}
      {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
    </React.Fragment>
  );
};

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  autoComplete: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node,
};

export default Input;
