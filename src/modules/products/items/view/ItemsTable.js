import React from "react";
import { Table } from "components/TableComponent";
import ItemStatusBadge from "components/Badges/ItemStatusBadge";
import { Carousel } from "components/Carousel";
import { Spinner } from "components/Spinner";
import moment from "moment";

const ItemsTable = (props) => {
  const { items, isLoading, toggleEdit, toggleDelete, viewMode } = props;

  const tableHeaders = [
    "Item ID",
    "Name",
    "Category",
    "Quantity",
    "Status",
    "Added At",
    "Actions",
  ];

  return (
    <div>
      {viewMode === "table" ? (
        <Table heads={tableHeaders} isLoading={isLoading}>
          {items?.map((item) => (
            <tr key={item.itemID} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b border-gray-200">
                {item.itemID}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {item.item}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {item.category}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {item.quantity}
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                <ItemStatusBadge status={item.status} />
              </td>
              <td className="px-4 py-2 border-b border-gray-200">
                {moment(
                  new Date(
                    item?.createdAt?._seconds * 1000 +
                      item?.createdAt?._nanoseconds / 1e6
                  )
                ).format("MM-DD-YYYY")}
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
      ) : isLoading ? (
        <Spinner />
      ) : items?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div
              key={item.itemID}
              className="border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <Carousel images={item.imageUrls} />
              <h3 className="text-lg font-semibold mt-2">{item.item}</h3>
              <p className="text-gray-600">{item.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-gray-800 font-bold mt-2">₱ {item.price}</p>
              <div className="flex justify-between items-center mt-2">
                <ItemStatusBadge status={item.status} />
                <span className="text-sm text-gray-500">
                  Qty: {item.quantity}
                </span>
              </div>
              <div className="mt-4">
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
              </div>
            </div>
          ))}
        </div>
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
};

export default ItemsTable;
