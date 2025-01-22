import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { getItems } from "api/item";

const ItemsChart = () => {
  const [items, setItems] = useState([]);

  const pastelColors = ["#7FC7FF", "#7FE5C7", "#FFE082", "#FF9E9E", "#D4A5E9"];

  const transformDataForECharts = (items) => {
    if (items.length === 0) return [];

    const categoryQuantities = items.reduce((acc, item) => {
      const category = item.category;
      if (!acc[category]) {
        acc[category] = {
          name: category,
          value: 0,
          items: [],
        };
      }
      acc[category].value += item.quantity;
      acc[category].items.push({
        name: item.item,
        quantity: item.quantity,
        supplier: item.supplier,
      });
      return acc;
    }, {});

    const data = Object.values(categoryQuantities).map((category, index) => ({
      name: category.name,
      value: category.value,
      items: category.items,
      itemStyle: {
        color: pastelColors[index % pastelColors.length],
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

  const isMobile = window.innerWidth <= 768; // Check if the screen is mobile-sized

  const option = {
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        const { name, value, items } = params.data;
        let tooltipText = `
          <div style="font-size: 14px; line-height: 1.5;">
            <strong style="font-size: 16px;">${name}</strong><br/>
            <span style="color: #666;">Total Quantity: ${value}</span><br/>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 8px 0;">
            <strong style="font-size: 14px;">Items:</strong><br/>
        `;

        const maxItemsToShow = 3;
        const itemsToShow = items.slice(0, maxItemsToShow);
        const remainingItemsCount = items.length - maxItemsToShow;

        itemsToShow.forEach((item) => {
          tooltipText += `
            <div style="margin-bottom: 8px;">
              <strong style="font-size: 13px;">${item.name}</strong><br/>
              <span style="color: #666; font-size: 12px;">
                - Quantity: ${item.quantity}<br/>
                - Supplier: ${item.supplier}<br/>
              </span>
            </div>
          `;
        });

        if (remainingItemsCount > 0) {
          tooltipText += `
            <div style="color: #666; font-size: 12px;">
              ... and ${remainingItemsCount} more items
            </div>
          `;
        }

        tooltipText += `</div>`;

        return tooltipText;
      },
    },
    legend: {
      orient: isMobile ? "horizontal" : "vertical", 
      bottom: isMobile ? "10%" : "auto",
      right: isMobile ? "auto" : "5%",
      top: isMobile ? "auto" : "20%", 
      textStyle: {
        color: "#666",
        fontSize: isMobile ? "12px" : "14px", 
      },
      itemWidth: isMobile ? 12 : 16, 
      itemHeight: isMobile ? 12 : 16,
      itemGap: isMobile ? 8 : 12, 
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
        radius: ["30%", "70%"],
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
        fontSize: isMobile ? "1em" : "1.2em", // Smaller title on mobile
        fontWeight: "bold",
      },
    },
  };

  return (
    <div style={{ padding: "16px" }}>
      <p
        style={{
          marginBottom: "24px",
          fontSize: "1em",
          color: "#666",
          textAlign: "center",
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
            height: "300px",
            backgroundColor: "#f9f9f9",
            borderRadius: "12px",
            color: "#999",
            fontSize: "1em",
            fontWeight: "500",
          }}
        >
          No item data available.
        </div>
      ) : (
        <ReactECharts
          option={option}
          echarts={echarts}
          style={{ height: isMobile ? "300px" : "500px", width: "100%" }} // Smaller height on mobile
        />
      )}
    </div>
  );
};

export default ItemsChart;