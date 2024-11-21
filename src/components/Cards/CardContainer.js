import React from "react";
import PropTypes from "prop-types";

const CardContainer = (props) => {
  const { title, content, footer, children, ...rest } = props
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
      {...rest}
    >

      {title && (
        <div className="mb-4">
          {typeof title === "string" ? (
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          ) : (
            title
          )}
  
          <div className="border-t my-4 border-gray-300" />
        </div>
      )}

      <div className="mb-4">
        {typeof content === "string" ? (
          <p className="text-gray-700">{content}</p>
        ) : (
          content
        )}
      </div>


      {children && <div className="mb-4">{children}</div>}

      {footer && (
        <div className="mt-4 border-t pt-4 text-gray-600">
          {footer}
        </div>
      )}
    </div>
  );
};

// Define Default Props
CardContainer.defaultProps = {
  footer: null,
  children: null,
};

// Define Prop Types
CardContainer.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  footer: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  children: PropTypes.node,
};

export default CardContainer;
