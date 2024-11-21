import React from "react";
import SalesActivity from "./StatsSalesActivity";
import StatsInventorySummary from "./StatsInventorySummary";
import StatsProductDetails from "./StatsProductDetails";
import StatsTopSellingItems from "./StatsTopSellingItems";

function Index() {
  return (
    <div>
      <div className="flex w-full border-b border-gray-300">
        <div className="w-3/5 border-r border-gray-300">
          <SalesActivity />
        </div>
        <div className="w-2/5">
          <StatsInventorySummary />
        </div>
      </div>
      <div className="space-y-5 p-5">
        <div className="flex w-full space-x-5">
          <div className="w-1/2">
            <StatsProductDetails />
          </div>
          <div className="w-1/2">
            <StatsTopSellingItems />
          </div>
        </div>
        <div className="flex w-full space-x-5">
          <div className="w-1/3">
            <StatsProductDetails />
          </div>
          <div className="w-10/12">
            <StatsTopSellingItems />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
