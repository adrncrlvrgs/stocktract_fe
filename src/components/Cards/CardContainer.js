import React from "react";
import PropTypes from "prop-types";
import { cn } from "utils/cn"; 

const CardContainer = (props) => {
  const { title, footer, children, className } = props;

  return (
    <div
      className={cn(
        "flex flex-col bg-white shadow-md rounded-lg p-6 border border-gray-200 h-full",
        className
      )}
    >
      {title && (
        <div className="pb-1">
          {typeof title === "string" ? (
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          ) : (
            title
          )}
          <div className="border-t my-2 border-gray-300" />
        </div>
      )}

      {children}

      {footer && <div className="mt-4 border-t pt-4 text-gray-600">{footer}</div>}
    </div>
  );
};

CardContainer.propTypes = {
  className: PropTypes.string, 
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};

export default CardContainer;