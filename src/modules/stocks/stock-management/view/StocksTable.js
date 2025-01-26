import React from "react";
import { Table } from "components/Table";
import StockBadge from "components/Badges/StockBadge";
import moment from "moment";

const StocksTable = (props) => {
  const { stocks, isLoading, toggleEdit, toggleDelete, auth } = props;
  const tableHeaders = [
    "Stock ID",
    "Supplier",
    "Item",
    "Category",
    "Quantity",
    "Total Cost",
    "Status",
    "Added At",
    ...(auth?.role === "admin" ? ["Actions"] : []),
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
            <StockBadge status={stock.status} />
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {moment(
              new Date(
                stock?.createdAt?._seconds * 1000 +
                  stock?.createdAt?._nanoseconds / 1e6
              )
            ).format("MM-DD-YYYY")}
          </td>
          {auth?.role === "admin" && (
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
          )}
        </tr>
      ))}
    </Table>
  );
};

export default StocksTable;
