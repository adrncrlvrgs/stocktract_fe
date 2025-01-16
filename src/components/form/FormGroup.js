import React from "react";
import { cn } from "utils/cn"; 

const FormGroup = ({
  label,
  children,
  className = "",
  error,
  isRequired = false,
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className={cn("block text-xs font-semibold text-gray-500")}>
          {label} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {error && <p className={cn("text-sm text-red-500")}>{error}</p>}
    </div>
  );
};

export default FormGroup;