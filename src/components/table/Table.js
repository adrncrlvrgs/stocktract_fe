import React from "react";
import PropTypes from "prop-types";
import { Spinner } from "components/Spinner";

function Table(props) {
  const { heads, children, isLoading } = props;
  return (
    <div className="overflow-x-auto w-full p-6 border rounded-lg bg-white shadow-lg">
      {isLoading ? (
        <Spinner />
      ) : children?.length > 0 ? (
        <table className="min-w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead className="bg-gray-50 text-gray-600 text-sm uppercase font-semibold">
            <tr>
              {heads.map((head, key) => (
                <th key={key} className="px-6 py-4 border-b border-gray-200">
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children}</tbody>
        </table>
      ) : (
        <div className="text-center py-6">
          <div className="text-gray-400 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 17v-2a4 4 0 10-8 0v2a2 2 0 002 2h8a2 2 0 002-2zM21 13v-2a4 4 0 10-8 0v2a2 2 0 002 2h8a2 2 0 002-2z"
              />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">No data available</p>
        </div>
      )}
    </div>
  );
}

Table.propTypes = {
  heads: PropTypes.arrayOf(PropTypes.string),
  children: PropTypes.node,
  isLoading: PropTypes.bool,
};


export default Table;
