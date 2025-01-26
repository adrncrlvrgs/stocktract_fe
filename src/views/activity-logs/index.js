import React from "react";

import useGetLogs from "modules/activity-logs/hooks/useGetLogs";

import LogsTable from "modules/activity-logs/view/LogsTable";
import LogsHeader from "modules/activity-logs/view/LogsHeader";
import PaginationComponent from "components/Pagination/PaginationComponent";

function Index() {
  const { logs, meta, isLoading } = useGetLogs();

  return (
    <div className="p-6">
      <LogsHeader />
      <LogsTable logs={logs} isLoading={isLoading} />
      <div className="mt-5">
        <PaginationComponent meta={meta} />
      </div>
    </div>
  );
}

export default Index;
