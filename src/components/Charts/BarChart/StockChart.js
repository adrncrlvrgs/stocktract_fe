import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { getStocks } from "api/stocks";

const StockChart = () => {
  const [stocks, setStocks] = useState([]);

  const pastelColors = ["#7FC7FF", "#7FE5C7", "#FFE082", "#FF9E9E", "#D4A5E9"];

  const transformDataForECharts = (stocks) => {
    if (stocks.length === 0) return { categories: [], values: [] };

    const sortedStocks = [...stocks].sort(
      (a, b) => b.totalQuantity - a.totalQuantity
    );
    const top5 = sortedStocks.slice(0, 5);
    const othersTotal = sortedStocks
      .slice(5)
      .reduce((sum, stock) => sum + stock.totalQuantity, 0);

    const categories = top5.map((stock) => stock.item);
    const values = top5.map((stock) => stock.totalQuantity);

    if (othersTotal > 0) {
      categories.push("Others");
      values.push(othersTotal);
    }

    return { categories, values };
  };

  useEffect(() => {
    const fetchStocks = async () => {
      const { data } = await getStocks();
      setStocks(data);
    };

    fetchStocks();
  }, []);

  const { categories, values } = transformDataForECharts(stocks);

  const option = {
    toolbox: {
      show: true,
      feature: {
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        rotate: 25,
        color: "#666",
        fontSize: 14,
      },
      axisLine: {
        lineStyle: {
          color: "#ddd",
        },
      },
    },
    yAxis: {
      type: "value",
      name: "Quantity",
      nameTextStyle: {
        color: "#666",
        fontSize: 14,
      },
      axisLine: {
        lineStyle: {
          color: "#ddd",
        },
      },
      splitLine: {
        lineStyle: {
          color: "#eee",
        },
      },
    },
    series: [
      {
        data: values.map((value, index) => ({
          value,
          itemStyle: {
            color:
              categories[index] === "Others"
                ? "#CCCCCC" // Gray for "Others"
                : pastelColors[index % pastelColors.length], // Cycle through pastel colors
            borderRadius: [6, 6, 0, 0],
          },
        })),
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.1)",
          borderRadius: [6, 6, 0, 0],
        },
        barWidth: "60%",
      },
    ],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "#333",
      textStyle: {
        color: "#fff",
      },
    },
    title: {
      text: "Stock Quantity by Item",
      left: "center",
      textStyle: {
        color: "#333",
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    grid: {
      containLabel: true,
      left: "10%",
      right: "10%",
      bottom: "10%",
      top: "20%",
    },
  };

  return (
    <div>
      <p
        style={{
          marginBottom: "24px",
          fontSize: "14px",
          color: "#666",
        }}
      >
        Visualize the stock quantities of different items in your inventory.
      </p>
      {stocks.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "400px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            color: "#999",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          No stock data available.
        </div>
      ) : (
        <ReactECharts
          option={option}
          echarts={echarts}
          style={{ height: "400px", width: "100%" }}
        />
      )}
    </div>
  );
};

export default StockChart;
