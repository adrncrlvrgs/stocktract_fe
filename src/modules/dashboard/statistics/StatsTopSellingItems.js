import React from "react";
import CardContainer from "components/Cards/CardContainer";

function StatsTopSellingItems() {
  return (
    <div>
      <CardContainer
        title={'Inventory Summary'}
      >
        <div>
          <p className="text-gray-700">
            Items in stock: <strong>500</strong>
          </p>
          <p className="text-gray-700">
            Items pending delivery: <strong>200</strong>
          </p>
        </div>
      </CardContainer>
    </div>
  );
}

export default StatsTopSellingItems;
