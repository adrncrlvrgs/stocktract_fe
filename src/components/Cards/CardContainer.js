import React from "react";
import PropTypes from "prop-types";

const CardContainer = (props) => {
  const { title, content, footer, children, ...rest } = props;
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200 h-full"
      {...rest}
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

      {children && <div className="mb-4">{children}</div>}

      {footer && (
        <div className="mt-4 border-t pt-4 text-gray-600">{footer}</div>
      )}
    </div>
  );
};


CardContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};

export default CardContainer;
