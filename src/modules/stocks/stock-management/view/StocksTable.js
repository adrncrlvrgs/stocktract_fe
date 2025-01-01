import React from "react";
import { Table } from "components/Table";

const StocksTable = (props) => {
  const { stocks, isLoading, toggleEdit, toggleDelete } = props;
  const tableHeaders = [
    "Stock ID",
    "Supplier",
    "Item",
    "Category",
    "Quantity",
    "Total Cost",
    "Status",
    "Actions",
  ];

  return (
    <Table heads={tableHeaders} isLoading={isLoading}>
      {stocks?.map((stock) => (
        <tr key={stock.stockID} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b border-gray-200">
            {stock.stockID}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {stock.supplier}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">{stock.item}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            {stock.category}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {stock.totalQuantity}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {stock.totalCost}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                stock.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {stock.status}
            </span>
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleEdit(stock.stockID)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline ml-4"
              onClick={() => toggleDelete(stock.stockID)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default StocksTable;
