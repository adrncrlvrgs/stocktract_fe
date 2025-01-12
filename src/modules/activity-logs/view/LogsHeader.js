import React from "react";

const LogsHeader = () => {
  return (
    <div className="mb-2">
      <h1 className="text-2xl font-semibold mb-1">Activity Logs</h1>
      <p className="text-gray-500 text-sm mb-4">
        View activity logs here.
      </p>

      {/* <div className="flex justify-between items-center my-4">
        <div className="w-1/4">
          <InputSearch value={search} onChange={handleSearchInputChange} />
        </div>
        <CategoryCreateAction toggle={toggleCreate} />
      </div> */}
    </div>
  );
};

export default LogsHeader;
