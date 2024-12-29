import React from "react";
import { Table } from "components/Table";

const ItemsTable = (props) => {
  const { items, isLoading, toggleCreate} = props;
  const tableHeaders = [
    "Item ID",
    "Name",
    "Category",
    "Quantity",
    "Status",
    "Actions",
  ];

  return (
    <Table heads={tableHeaders} isLoading={isLoading}>
      {items?.map((item) => (
        <tr key={item.itemID} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b border-gray-200">{item.itemID}</td>
          <td className="px-4 py-2 border-b border-gray-200">{item.name}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            {item.category}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {item.quantity}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                item.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {item.status}
            </span>
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleCreate(item.itemID)}
            >
              Add Sale
            </button>
           
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default ItemsTable;
