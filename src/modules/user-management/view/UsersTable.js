import React from "react";
import { Table } from "components/Table/Table";
import { Avatar } from "components/Avatar";
import StatusBadge from "components/Badges/StatusBadge";
import moment from "moment";

const UsersTable = (props) => {
  const { users, isLoading, toggleEdit, toggleDelete } = props;
  const tableHeaders = [
    "User ID",
    "Image",
    "Name",
    "Role",
    "Email",
    "Status",
    "Created At",
    "Actions",
  ];

  return (
    <Table heads={tableHeaders} isLoading={isLoading}>
      {users?.map((user) => (
        <tr key={user.userID} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b border-gray-200">{user.userID}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            <Avatar
              size="sm"
              src={user.profileImageUrl}
              alt={user.userID.toString()}
            />
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {`${user.firstName} ${user.lastName}`}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">{user.role}</td>
          <td className="px-4 py-2 border-b border-gray-200">{user.email}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            <StatusBadge status={user.status} />
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            {moment(
              new Date(
                user?.createdAt?._seconds * 1000 +
                  user?.createdAt?._nanoseconds / 1e6
              )
            ).format("MM-DD-YYYY")}
          </td>
          <td className="px-4 py-2 border-b border-gray-200">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => toggleEdit(user.userID)}
            >
              Edit
            </button>
            <button
              className="text-red-500 hover:underline ml-4"
              onClick={() => toggleDelete(user.userID)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default UsersTable;
