import React from "react";
import Table from "components/table/Table";

const ListTable = (props) => {
  const { post, isLoading, toggleEdit, toggleDelete } = props;
  const heads = ["Title", "Message", "Created At", "Actions"];

  return (
    <Table heads={heads} isLoading={isLoading}>
      {/* {post?.map((data) => (
        <tr key={data.postId} className="border-b hover:bg-gray-50">
          <td className="px-4 py-2 text-sm text-gray-700">{data.title}</td>
          <td className="px-4 py-2 text-sm text-gray-700">{data.message}</td>
          <td className="px-4 py-2 text-sm text-gray-500">
            {moment(data.createdAt).format("YYYY-MM-DD | hh:mm:ss A")}
          </td>
          <td className="px-4 py-2 text-sm text-gray-700">
            <div className="flex space-x-2">
              <button
                onClick={() => toggleEdit(data.postId)}
                className="px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => toggleDelete(data.postId)}
                className="px-3 py-1 bg-red-500 text-white text-xs rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      ))} */}
    </Table>
  );
};

export default ListTable;
