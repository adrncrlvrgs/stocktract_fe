import React from "react";
import { Table } from "components/Table";

const ListTable = (props) => {
  const { post, isLoading, toggleEdit, toggleDelete } = props;

  const mockUsers = [
    {
      id: 1,
      name: "Alice Johnson",
      role: "Admin",
      email: "alice.johnson@example.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Bob Smith",
      role: "User",
      email: "bob.smith@example.com",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Charlie Brown",
      role: "Manager",
      email: "charlie.brown@example.com",
      status: "Active",
    },
  ];

  const tableHeaders = ["Name", "Role", "Email", "Status", "Actions"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Management</h1>
      <Table heads={tableHeaders}>
        {mockUsers.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
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
              <button className="text-blue-500 hover:underline">Edit</button>
              <button className="text-red-500 hover:underline ml-4">
                Delete
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ListTable;
