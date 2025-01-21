import React from "react";
import DashBoardStockChart from "components/Charts/BarChart/DashBoardStockChart";
import CardContainer from "components/Cards/CardContainer";

function StocksSummary() {
  return (
    <CardContainer title={"Stocks Summary"}>
      <DashBoardStockChart />
    </CardContainer>
  );
}

export default StocksSummary;
