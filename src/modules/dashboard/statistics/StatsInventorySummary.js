import React from "react";

const StatsInventorySummary = (props) => {
  return (
    <div className="flex flex-col bg-gray-100 p-4 px-20 h-72">
      <h2 className="text-xl font-semibold mb-4 ">Inventory Summary</h2>
      <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
        <div className="flex items-center border rounded-md p-2 w-full bg-white">
          <label className="text-gray-700 font-medium mr-2">
            QUANTITY IN HAND
          </label>
          <span className="font-mono text-right flex-1">10458</span>
        </div>

        <div className="flex items-center border rounded-md p-2 w-full bg-white">
          <label className="text-gray-700 font-medium mr-2">
            QUANTITY TO BE RECEIVED
          </label>
          <span className="font-mono text-right flex-1">168</span>
        </div>
      </div>
    </div>
  );
};

export default StatsInventorySummary;
