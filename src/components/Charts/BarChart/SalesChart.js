import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";
import { getSales } from "api/sales";
import { SALE_TYPE } from "constants/statuses";

const SalesChart = () => {
  const [sales, setSales] = useState([]);
  const colors = ["#5470C6", "#91CC75", "#FFD700"];

  const getDayOfWeek = (timestamp) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const date = new Date(timestamp._seconds * 1000);
    return days[date.getDay()];
  };

  const transformDataForECharts = (sales) => {
    if (sales.length === 0)
      return { days: [], quantities: [], amounts: [], salesData: [] };

    const salesByDay = sales.reduce((acc, sale) => {
      const day = getDayOfWeek(sale.createdAt);
      if (!acc[day]) {
        acc[day] = {
          quantity: 0,
          amount: 0,
          sales: 0,
        };
      }
      acc[day].quantity += sale.itemQuantity;
      acc[day].amount += parseFloat(sale.totalAmount);
      acc[day].sales += 1;
      return acc;
    }, {});

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const quantities = daysOfWeek.map((day) => salesByDay[day]?.quantity || 0);
    const amounts = daysOfWeek.map((day) => salesByDay[day]?.amount || 0);
    const salesData = daysOfWeek.map((day) => salesByDay[day]?.sales || 0);

    return { days: daysOfWeek, quantities, amounts, salesData };
  };

  useEffect(() => {
    const fetchSales = async () => {
      const { data } = await getSales();
      setSales(data);
    };

    fetchSales();
  }, []);

  const { days, quantities, amounts, salesData } =
    transformDataForECharts(sales);

  const option = {
    title: {
      text: "Sale Statistics",
      left: "center",
      textStyle: {
        color: "#333",
        fontSize: 18,
        fontWeight: "bold",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
      formatter: (params) => {
        let day = "";
        const tooltipData = {
          quantity: 0,
          amount: 0,
          sales: 0,
        };

        params.forEach((param) => {
          if (param.seriesName === "Sales Quantity") {
            tooltipData.quantity = param.value;
          } else if (param.seriesName === "Total Sales Amount") {
            tooltipData.amount = param.value;
          } else if (param.seriesName === "Sales Count") {
            tooltipData.sales = param.value;
          }
          if (!day && param.name) {
            day = param.name;
          }
        });

        return `
          <div style="font-size: 14px; line-height: 1.5;">
            <strong style="font-size: 16px;">${day}</strong><br/>
            <span style="color: #666;">Quantity: ${tooltipData.quantity} pcs</span><br/>
            <span style="color: #666;">Total Amount: ₱${tooltipData.amount.toFixed(2)}</span><br/>
            <span style="color: #666;">Sales: ${tooltipData.sales}</span><br/>
          </div>
        `;
      },
    },
    toolbox: {
      feature: {
        dataView: { show: true, readOnly: false },
        magicType: { show: true, type: ["line", "bar"] },
        restore: { show: true },
        saveAsImage: { show: true },
      },
    },
    legend: {
      data: ["Sales Quantity", "Total Sales Amount", "Sales Count"],
      bottom: "3%",
      textStyle: {
        fontSize: 12,
      },
    },
    xAxis: [
      {
        type: "category",
        data: days,
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Sales Quantity",
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[0],
          },
        },
        axisLabel: {
          formatter: "{value} pcs",
        },
      },
      {
        type: "value",
        name: "Total Sales Amount",
        min: 0,
        alignTicks: true,
        offset: -70,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[1],
          },
        },
        axisLabel: {
          formatter: "₱{value}",
        },
      },
      {
        type: "value",
        name: "Sales Count",
        alignTicks: true,
        offset: 45,
        min: 0,
        axisLine: {
          show: true,
          lineStyle: {
            color: colors[2],
          },
        },
        axisLabel: {
          formatter: "{value} sales",
        },
      },
    ],
    series: [
      {
        name: "Sales Quantity",
        type: "bar",
        tooltip: {
          valueFormatter: (value) => `${value} pcs`,
        },
        data: quantities,
      },
      {
        name: "Total Sales Amount",
        type: "bar",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: (value) => `₱${value.toFixed(2)}`,
        },
        data: amounts,
      },
      {
        name: "Sales Count",
        type: "line",
        yAxisIndex: 2,
        tooltip: {
          valueFormatter: (value) => `${value} sales`,
        },
        data: salesData,
        lineStyle: {
          color: "#FFD700",
        },
      },
    ],
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
        Visualize sales data by day of the week, including sales quantities
        (bar), total sales amounts (bar), and sales count (line).
      </p>
      {sales.length === 0 ? (
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
          No sales data available.
        </div>
      ) : (
        <ReactECharts
          option={option}
          echarts={echarts}
          style={{ height: "500px", width: "90%" }}
        />
      )}
    </div>
  );
};

export default SalesChart;