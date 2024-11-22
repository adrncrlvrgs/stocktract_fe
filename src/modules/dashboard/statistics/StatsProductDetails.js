import React from "react";
import CardContainer from "components/Cards/CardContainer";
import DoughnutChart from "components/Charts/DoughnutChart/DoughnutChart";

function StatsProductDetails() {
  return (
    <div>
      <CardContainer
        title={<h2 className="text-2xl text-indigo-600">Inventory Summary</h2>}
      >
        <DoughnutChart />
      </CardContainer>
    </div>
  );
}

export default StatsProductDetails;
