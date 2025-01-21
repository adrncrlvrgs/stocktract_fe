import React from "react";
import CardContainer from "components/Cards/CardContainer";
import StatsItemDetails from "components/Charts/DoughnutChart/DoughnutChart";

function StatsProductDetails() {
  return (
    <div className="h-full">
      <CardContainer title={"Product Item Details"}>
        <StatsItemDetails />
      </CardContainer>
    </div>
  );
}

export default StatsProductDetails;
