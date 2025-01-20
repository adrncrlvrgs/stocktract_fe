import React from "react";
import PropTypes from "prop-types";
import { SALE_TYPE } from "constants/statuses";

const SALE_STYLES = {
  [SALE_TYPE.Ordered]: {
    textColor: "text-gray-700",
    bgColor: "bg-gray-200",
  },
  [SALE_TYPE.ToBePacked]: {
    textColor: "text-purple-700",
    bgColor: "bg-purple-100",
  },
  [SALE_TYPE.ToBeDelivered]: {
    textColor: "text-yellow-700",
    bgColor: "bg-yellow-100",
  },
  [SALE_TYPE.Delivered]: {
    textColor: "text-green-700",
    bgColor: "bg-green-100",
  },
  [SALE_TYPE.Returned]: {
    textColor: "text-red-700",
    bgColor: "bg-red-100",
  },
  [SALE_TYPE.Canceled]: {
    textColor: "text-gray-500",
    bgColor: "bg-gray-300",
  },
};

const SaleBadge = ({ status }) => {
  const { textColor, bgColor } = SALE_STYLES[status] || {
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

SaleBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(SALE_TYPE)).isRequired,
};

export default SaleBadge;
