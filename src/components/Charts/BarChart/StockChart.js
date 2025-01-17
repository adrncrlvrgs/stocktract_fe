import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { getStocks } from "api/stocks";

const StockChart = () => {
  const [stocks, setStocks] = useState([]);

  // Transform data for ECharts
  const transformDataForECharts = (stocks) => {
    const categories = stocks.map((stock) => stock.item);
    const values = stocks.map((stock) => stock.totalQuantity);
    return { categories, values };
  };

  // Fetch data on component mount
  useEffect(() => {
    const fetchStocks = async () => {
      const { data } = await getStocks();
      setStocks(data);
    };

    fetchStocks();
  }, []);

  const { categories, values } = transformDataForECharts(stocks);

  // Modern ECharts configuration
  const option = {
    xAxis: {
      type: "category",
      data: categories,
      axisLabel: {
        rotate: 0,
        color: "#666", // Dark gray for axis labels
        fontSize: 14, // Slightly larger font size
      },
      axisLine: {
        lineStyle: {
          color: "#ddd", // Light gray for axis line
        },
      },
    },
    yAxis: {
      type: "value",
      name: "Quantity",
      nameTextStyle: {
        color: "#666", // Dark gray for axis name
        fontSize: 14,
      },
      axisLine: {
        lineStyle: {
          color: "#ddd", // Light gray for axis line
        },
      },
      splitLine: {
        lineStyle: {
          color: "#eee", // Very light gray for split lines
        },
      },
    },
    series: [
      {
        data: values,
        type: "bar",
        showBackground: true,
        backgroundStyle: {
          color: "rgba(180, 180, 180, 0.1)", // Lighter background
          borderRadius: [6, 6, 0, 0], // Rounded corners for background
        },
        itemStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: "#6a11cb" }, // Gradient start color
            { offset: 1, color: "#2575fc" }, // Gradient end color
          ]),
          borderRadius: [6, 6, 0, 0], // Rounded corners for bars
        },
        barWidth: "60%", // Wider bars for a modern look
      },
    ],
    tooltip: {
      trigger: "axis",
      backgroundColor: "rgba(0, 0, 0, 0.8)", // Dark tooltip background
      borderColor: "#333",
      textStyle: {
        color: "#fff", // White text for tooltip
      },
    },
    title: {
      text: "Stock Quantity by Item",
      left: "center",
      textStyle: {
        color: "#333", // Dark gray for title
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    grid: {
      containLabel: true,
      left: "10%", // Add padding to the left
      right: "10%", // Add padding to the right
      bottom: "10%", // Add padding to the bottom
      top: "20%", // Add padding to the top
    },
  };

  return (
    <div>
      <p
        style={{
          marginBottom: "24px",
          fontSize: "14px",
          color: "#666", // Gray for the description
        }}
      >
        Visualize the stock quantities of different items in your inventory.
      </p>
      <ReactECharts
        option={option}
        echarts={echarts}
        style={{ height: "400px", width: "100%" }}
      />
    </div>
  );
};

export default StockChart;
