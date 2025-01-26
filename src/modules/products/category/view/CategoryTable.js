import React from "react";
import Table from "components/Table/Table.js";

const CategoryTable = (props) => {
  const { categories, isLoading, toggleEdit, toggleDelete } = props;
  const tableHeaders = [
    "Category ID",
    "Name",
    // "Image",
    "Status",
    // "Created At",
    // "Updated At",
    "Actions",
  ];

  return (
    <Table heads={tableHeaders} isLoading={isLoading}>
      {categories?.map((category) => (
        <tr key={category.categoryID} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b border-gray-200">
            {category.categoryID}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {category.name}
          </td>
          {/* <td className="px-4 py-2 border-b border-gray-200">
            {category.image}
          </td> */}
          <td className="px-4 py-2 border-b border-gray-200">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                category.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {category.status}
            </span>
          </td>
          {/* <td className="px-4 py-2 border-b border-gray-200">
            {category.createdAt}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {category.updatedAt}
          </td> */}
          <td className="px-4 py-2 border-b border-gray-200">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleEdit(category.categoryID)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline ml-4"
              onClick={() => toggleDelete(category.categoryID)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default CategoryTable;
