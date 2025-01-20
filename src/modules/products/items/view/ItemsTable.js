import React from "react";
import { Table } from "components/Table";
import ItemStatusBadge from "components/Badges/ItemStatusBadge";

const ItemsTable = (props) => {
  const { items, isLoading, toggleEdit, toggleDelete } = props;
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
          <td className="px-4 py-2 border-b border-gray-200">{item.item}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            {item.category}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {item.quantity}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <ItemStatusBadge status={item.status}/>
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleEdit(item.itemID)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline ml-4"
              onClick={() => toggleDelete(item.itemID)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default ItemsTable;
