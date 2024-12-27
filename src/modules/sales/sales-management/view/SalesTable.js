import React from "react";
import { Table } from "components/Table";

const SalesTable = (props) => {
  const { sales, isLoading, toggleEdit, toggleDelete } = props;
  const tableHeaders = [
    "Sale ID",
    "Item",
    "Quantity",
    "Total Amount",
    "Status",
    "Actions",
  ];

  return (
    <Table heads={tableHeaders} isLoading={isLoading}>
      {sales?.map((sale) => (
        <tr key={sale.saleID} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b border-gray-200">{sale.saleID}</td>
          <td className="px-4 py-2 border-b border-gray-200">{sale.item}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            {sale.quantity}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {sale.totalAmount}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                sale.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {sale.status}
            </span>
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleEdit(sale.saleID)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline ml-4"
              onClick={() => toggleDelete(sale.saleID)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default SalesTable;
