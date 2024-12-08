import React from "react";
import { Table } from "components/Table";
import { data } from "react-router-dom";

const UsersTable = (props) => {
  const { users, isLoading, toggleEdit, toggleDelete } = props;
  const tableHeaders = ["Name", "Role", "Email", "Status", "Actions"];
  return (
    <Table heads={tableHeaders} isLoading={isLoading}>
      {users?.map((user) => (
        <tr key={user.userID} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b border-gray-200">{user.name}</td>
          <td className="px-4 py-2 border-b border-gray-200">{user.role}</td>
          <td className="px-4 py-2 border-b border-gray-200">{user.email}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            <span
              className={`inline-block px-2 py-1 text-xs font-semibold rounded ${
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <button className="text-blue-500 hover:underline" onClick={()=> toggleEdit(user.userID)}>Edit</button>
            <button className="text-red-500 hover:underline ml-4">
              Delete
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default UsersTable;
