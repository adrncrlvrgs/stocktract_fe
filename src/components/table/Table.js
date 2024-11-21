import React from "react";
import PropTypes from "prop-types";

function Table({ heads, children, isLoading = false }) {
  return (
    <div className="overflow-x-auto w-full p-6 border rounded-lg bg-white shadow-lg">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="flex flex-col items-center">
            {/* Animated Spinner */}
            <svg
              className="animate-spin h-8 w-8 text-blue-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            <p className="mt-4 text-gray-500 text-sm">
              Loading data, please wait...
            </p>
          </div>
        </div>
      ) : heads?.length > 0 ? (
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
            {/* Icon for empty state */}
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
  children: PropTypes.node.isRequired, 
  isLoading: PropTypes.bool,
};

Table.defaultProps = {
  heads: [],
  isLoading: false, 
};

export default Table;
