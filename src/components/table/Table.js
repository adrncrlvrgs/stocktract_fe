import React from "react";

function Table(props) {
  const { heads, children, isLoading } = props;

  return (
    <div className="overflow-x-auto w-full p-4 border rounded-md bg-white shadow-md">
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : heads?.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200">
          <thead className="bg-gray-100 border-b border-gray-200">
            <tr>
              {heads?.map((head, key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-600 uppercase tracking-wider"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">{children}</tbody>
        </table>
      ) : (
        <div className="text-center py-4">
          <p className="text-gray-500">No data</p>
        </div>
      )}
    </div>
  );
}

export default Table;
