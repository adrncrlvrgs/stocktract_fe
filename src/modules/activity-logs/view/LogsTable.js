import React from "react";
import { Table } from "components/Table";

const LogsTable = (props) => {
  const { logs, isLoading } = props;
  const tableHeaders = ["logID", "userID", "action", "details", "Date"];

  return (
    <Table heads={tableHeaders} isLoading={isLoading}>
      <tr key={item.itemID} className="hover:bg-gray-50">
        <td className="px-4 py-2 border-b border-gray-200">{logs.logID}</td>
        <td className="px-4 py-2 border-b border-gray-200">{logs.userID}</td>
        <td className="px-4 py-2 border-b border-gray-200">{logs.action}</td>
        <td className="px-4 py-2 border-b border-gray-200">{logs.details}</td>
        <td className="px-4 py-2 border-b border-gray-200">{logs.date}</td>
      </tr>
    </Table>
  );
};

export default LogsTable;
