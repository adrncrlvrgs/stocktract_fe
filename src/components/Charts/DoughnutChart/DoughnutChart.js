import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { getItems } from "api/item";

const StatsItemDetails = () => {
  const [items, setItems] = useState([]);

  const pastelColors = ["#7FC7FF", "#7FE5C7", "#FFE082", "#FF9E9E", "#D4A5E9"];

  const transformDataForECharts = (items) => {
    if (items.length === 0) return [];

    const sortedItems = [...items].sort((a, b) => b.quantity - a.quantity);
    const top5 = sortedItems.slice(0, 5);
    const othersTotal = sortedItems
      .slice(5)
      .reduce((sum, item) => sum + item.quantity, 0);

    const data = top5.map((item) => ({
      value: item.quantity,
      name: item.item,
    }));

    if (othersTotal > 0) {
      data.push({ value: othersTotal, name: "Others" });
    }

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
    },
    legend: {
      orient: "vertical",
      top: "center",
      left: "start",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 10,
          color: (params) => {
            return params.name === "Others"
              ? "#CCCCCC"
              : pastelColors[params.dataIndex % pastelColors.length];
          },
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 10,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: data,
        left: "20%",
      },
    ],
  };

  return (
    <div className="flex items-center w-full h-full">
      <div className="w-full flex justify-center">
        <ReactECharts
          option={option}
          echarts={echarts}
          style={{ width: "100%", height: "150%" }}
        />
      </div>
    </div>
  );
};

export default StatsItemDetails;