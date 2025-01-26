import React from "react";
import { Table } from "components/TableComponent";
import moment from "moment";

const LogsTable = (props) => {
  const { logs, isLoading } = props;
  const tableHeaders = ["logID", "userID", "action", "details", "Date"];

  return (
    <Table heads={tableHeaders} isLoading={isLoading}>
      {logs?.map((log) => (
        <tr key={log.logID} className="hover:bg-gray-50">
          <td className="px-4 py-2 border-b border-gray-200">{log.logID}</td>
          <td className="px-4 py-2 border-b border-gray-200">{log.userID}</td>
          <td className="px-4 py-2 border-b border-gray-200">{log.action}</td>
          <td className="px-4 py-2 border-b border-gray-200">{log.details}</td>
          <td className="px-4 py-2 border-b border-gray-200">
            {moment(
              new Date(
                log?.timestamp?._seconds * 1000 +
                  log?.timestamp?._nanoseconds / 1e6
              )
            ).format("MM-DD-YYYY")}
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default LogsTable;
