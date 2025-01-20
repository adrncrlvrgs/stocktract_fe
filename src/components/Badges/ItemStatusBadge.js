import React from "react";
import PropTypes from "prop-types";
import { ITEM_STATUS_TYPE } from "constants/statuses";

const ITEM_STATUS_STYLES = {
  [ITEM_STATUS_TYPE.Available]: {
    textColor: "text-green-700",
    bgColor: "bg-green-100",
  },
  [ITEM_STATUS_TYPE.Unavailable]: {
    textColor: "text-red-700",
    bgColor: "bg-red-100",
  },
};

const ItemStatusBadge = ({ status }) => {
  const { textColor, bgColor } = ITEM_STATUS_STYLES[status] || {
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

ItemStatusBadge.propTypes = {
  status: PropTypes.oneOf(Object.values(ITEM_STATUS_TYPE)).isRequired,
};

export default ItemStatusBadge;
