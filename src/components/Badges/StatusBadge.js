import React from "react";
import PropTypes from "prop-types";
import { STATUS_TYPE } from "constants/statuses"; 
const STATUS_STYLES = {
  [STATUS_TYPE.Active]: {
    textColor: "text-green-700",
    bgColor: "bg-green-100",
  },
  [STATUS_TYPE.Inactive]: {
    textColor: "text-red-700",
    bgColor: "bg-red-100",
  },
};

const StatusBadge = ({ status }) => {
  const { textColor, bgColor } = STATUS_STYLES[status] || {
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

StatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(STATUS_TYPE)).isRequired,
};

export default StatusBadge;
