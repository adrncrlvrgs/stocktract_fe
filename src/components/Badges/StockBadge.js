import React from "react";
import PropTypes from "prop-types";
import { STOCK_TYPE } from "constants/statuses";

const STOCK_STYLES = {
  [STOCK_TYPE.InStock]: {
    textColor: "text-green-700",
    bgColor: "bg-green-100",
  },
  [STOCK_TYPE.OutOfStock]: {
    textColor: "text-red-700",
    bgColor: "bg-red-100",
  },
  [STOCK_TYPE.ToBeDelivered]: {
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  [STOCK_TYPE.OnOrder]: {
    textColor: "text-blue-700",
    bgColor: "bg-blue-100",
  },
};

const StockBadge = ({ status }) => {
  const { textColor, bgColor } = STOCK_STYLES[status] || {
    textColor: "text-gray-700",
    bgColor: "bg-gray-100",
  };

  return (
    <span
      className={`inline-block px-2 py-1 text-xs font-semibold rounded ${textColor} ${bgColor}`}
    >
      {status}
    </span>
  );
};

StockBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(STOCK_TYPE)).isRequired,
};

export default StockBadge;
