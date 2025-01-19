import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { getItems } from "api/item";

const ItemsChart = () => {
  const [items, setItems] = useState([]);

  const pastelColors = ["#7FC7FF", "#7FE5C7", "#FFE082", "#FF9E9E", "#D4A5E9"];

  const transformDataForECharts = (items) => {
    if (items.length === 0) return [];

    // Group items by category and sum the quantities
    const categoryQuantities = items.reduce((acc, item) => {
      const category = item.category;
      acc[category] = (acc[category] || 0) + item.quantity; // Sum quantities
      return acc;
    }, {});

    // Transform the data into the format required by ECharts
    const data = Object.keys(categoryQuantities).map((category, index) => ({
      name: category,
      value: categoryQuantities[category],
      itemStyle: {
        color: pastelColors[index % pastelColors.length], // Cycle through pastel colors
      },
    }));

    return data;
  };

  useEffect(() => {
    const fetchItems = async () => {
      const { data } = await getItems();
      setItems(data);
    };

    fetchItems();
  }, []);

  const data = transformDataForECharts(items);

  const option = {
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b}: {c} ({d}%)",
    },
    legend: {
      bottom: "10%",
      left: "center",
      textStyle: {
        color: "#666",
      },
    },
    toolbox: {
      show: true,
      feature: {
        mark: { show: true },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    itemStyle: {
      borderRadius: 5,
    },

    series: [
      {
        name: "Items by Category",
        type: "pie",
        radius: [30, 150],
        center: ["50%", "50%"],
        roseType: "area",
        data: data,
      },
    ],
    title: {
      text: "Items Distribution by Category (Quantity)",
      left: "center",
      textStyle: {
        color: "#333",
        fontSize: 18,
        fontWeight: "bold",
      },
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
        Visualize the distribution of items by category, weighted by quantity.
      </p>
      {items.length === 0 ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "500px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            color: "#999",
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          No item data available.
        </div>
      ) : (
        <ReactECharts
          option={option}
          echarts={echarts}
          style={{ height: "500px", width: "100%" }}
        />
      )}
    </div>
  );
};

export default ItemsChart;
