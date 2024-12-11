import React from "react";
import PropTypes from "prop-types";
import { cn } from "utils/cn"; 


const Button = ({
  active,
  ariaLabel,
  block,
  children,
  className = "",
  cssModule,
  close,
  color = "secondary",
  disabled,
  innerRef,
  onClick,
  outline,
  size,
  tag: Tag = "button",
  ...props
}) => {
  const colors = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-500",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
    warning: "bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-400",
    info: "bg-cyan-500 text-white hover:bg-cyan-600 focus:ring-cyan-400",
    light: "bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300",
    dark: "bg-gray-900 text-white hover:bg-gray-800 focus:ring-gray-700",
  };

  const sizes = {
    sm: "text-sm py-2 px-3",
    lg: "text-lg py-3 px-5",
  };

  const buttonClasses = cn(
    "inline-flex items-center justify-center font-small rounded-md transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2",
    active && "ring-2 ring-offset-2 ring-blue-500",
    block && "w-full",
    outline
      ? `border-2 text-${color}-600 border-${color}-600 hover:bg-${color}-50 focus:ring-${color}-300`
      : colors[color],
    size && sizes[size],
    disabled && "opacity-50 cursor-not-allowed",
    className
  );

  return close ? (
    <button
      aria-label={ariaLabel || "Close"}
      className="text-gray-400 hover:text-gray-600 focus:outline-none"
      onClick={onClick}
      {...props}
    >
      <span className="sr-only">Close</span>
      &times;
    </button>
  ) : (
    <Tag
      type={Tag === "button" ? "button" : undefined}
      className={buttonClasses}
      ref={innerRef}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Tag>
  );
};

Button.propTypes = {
  active: PropTypes.bool,
  "aria-label": PropTypes.string,
  block: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  close: PropTypes.bool,
  color: PropTypes.string,
  disabled: PropTypes.bool,
  innerRef: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
    PropTypes.string,
  ]),
  onClick: PropTypes.func,
  outline: PropTypes.bool,
  size: PropTypes.string,
  tag: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
};

export default Button;
