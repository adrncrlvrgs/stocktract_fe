import React from "react";
import { Table } from "components/TableComponent";
import StockBadge from "components/Badges/StockBadge";

const StocksTable = (props) => {
  const { stocks, isLoading, toggleCreate } = props;
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
            <StockBadge status={stock.status} />
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleCreate(stock.stockID)}
            >
              Add Item
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default StocksTable;
