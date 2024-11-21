import React from "react";
import CardContainer from "components/Cards/CardContainer";

function StatsTopSellingItems() {
  return (
    <div>
      <CardContainer
        title={<h2 className="text-2xl text-indigo-600">Inventory Summary</h2>}
        content={
          <div>
            <p className="text-gray-700">
              Items in stock: <strong>500</strong>
            </p>
            <p className="text-gray-700">
              Items pending delivery: <strong>200</strong>
            </p>
          </div>
        }
      />
    </div>
  );
}

export default StatsTopSellingItems;