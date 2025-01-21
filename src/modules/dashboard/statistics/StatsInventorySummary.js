import React, { useEffect, useState } from "react";
import { getStocks } from "api/stocks";

export const STOCK_TYPE = {
  InStock: "In Stock",
  OutOfStock: "Out of Stock",
  ToBeDelivered: "To be Delivered",
  OnOrder: "On Order",
};

const StatsInventorySummary = () => {
  const [stocksData, setStocksData] = useState([]);

  useEffect(() => {
    const fetchStocksData = async () => {
      try {
        const { data } = await getStocks();
        setStocksData(data);
      } catch (error) {
        console.error("Failed to fetch stocks data:", error);
      }
    };

    fetchStocksData();
  }, []);

  // Calculate total quantities for In Stock and To be Delivered
  const calculateQuantities = (stocks) => {
    return stocks.reduce(
      (acc, stock) => {
        if (stock.status === STOCK_TYPE.InStock) {
          acc.inStock += stock.totalQuantity;
        } else if (stock.status === STOCK_TYPE.ToBeDelivered) {
          acc.toBeDelivered += stock.totalQuantity;
        }
        return acc;
      },
      { inStock: 0, toBeDelivered: 0 }
    );
  };

  const { inStock, toBeDelivered } = calculateQuantities(stocksData);

  return (
    <div className="flex flex-col bg-gray-100 p-4 px-20 h-72">
      <h2 className="text-xl font-semibold">Inventory Summary</h2>
      <div className="flex flex-col items-center justify-center h-full w-full space-y-4">
        <div className="flex items-center border rounded-md p-2 w-full bg-white">
          <label className="text-gray-700 font-medium mr-2">
            QUANTITY IN HAND
          </label>
          <span className="font-mono text-right flex-1">{inStock}</span>
        </div>

        <div className="flex items-center border rounded-md p-2 w-full bg-white">
          <label className="text-gray-700 font-medium mr-2">
            QUANTITY TO BE RECEIVED
          </label>
          <span className="font-mono text-right flex-1">{toBeDelivered}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsInventorySummary;