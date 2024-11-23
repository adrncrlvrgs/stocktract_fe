import React from "react";
import CardContainer from "components/Cards/CardContainer";

function StatsPurchaseOrder() {
  return (
    <div>
      <CardContainer title={"Purchase Order"}>
        <div className="flex justify-center">
          <div className="text-4xl font-bold text-gray-800 self-center">
            {678}
          </div>
        </div>
      </CardContainer>
    </div>
  );
}

export default StatsPurchaseOrder;
