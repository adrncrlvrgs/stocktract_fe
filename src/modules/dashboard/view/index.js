import React from "react";
import { ToastContainer } from "react-toastify";
import SalesActivity from "../statistics/StatsSalesActivity";
import StatsInventorySummary from "../statistics/StatsInventorySummary";
import StatsProductDetails from "../statistics/StatsProductDetails";
import StatsTopSellingItems from "../statistics/StatsTopSellingItems";
import StatsPurchaseOrder from "../statistics/StatsPurchaseOrder";
import StocksSummary from "../statistics/StocksSummary";

function Index() {
  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss={false}
        pauseOnHover={false}
      />
      <div className="flex flex-col sm:flex-row w-full border-b border-gray-300">
        <div className="w-full sm:w-3/5 border-r border-gray-300">
          <SalesActivity />
        </div>
        <div className="w-full sm:w-2/5">
          <StatsInventorySummary />
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="flex flex-col sm:flex-row sm:space-x-5">
          <div className="w-full sm:w-1/2">
            <StatsProductDetails />
          </div>
          <div className="w-full sm:w-1/2">
            <StatsTopSellingItems />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-5">
          <div className="w-full sm:w-1/3">
            <StatsPurchaseOrder />
          </div>
          <div className="w-full sm:w-2/3">
            <StocksSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
