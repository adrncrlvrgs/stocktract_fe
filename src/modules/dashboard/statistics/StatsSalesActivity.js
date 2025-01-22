import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getSales } from "api/sales";
import { motion } from "framer-motion";

export const SALE_TYPE = {
  Ordered: "Ordered",
  ToBePacked: "To be Packed",
  ToBeDelivered: "To be Delivered",
  Delivered: "Delivered",
};

const StatsCard = (props) => {
  const { number, title, className, index } = props;

  const getEmoji = (title) => {
    switch (title) {
      case "Ordered":
        return "📦";
      case "To be Packed":
        return "📤";
      case "To be Delivered":
        return "🚚";
      case "Delivered":
        return "✅";
      default:
        return "";
    }
  };

  const getColor = (title) => {
    switch (title) {
      case "Ordered":
        return "bg-blue-50 text-blue-800 border-blue-200"; 
      case "To be Packed":
        return "bg-purple-50 text-purple-800 border-purple-200"; 
      case "To be Delivered":
        return "bg-orange-50 text-orange-800 border-orange-200"; 
      case "Delivered":
        return "bg-green-50 text-green-800 border-green-200"; 
      default:
        return "bg-gray-50 text-gray-800 border-gray-200";
    }
  };

  return (
    <div
      key={index}
      className={`flex flex-col items-center justify-center w-48 h-48 shadow-lg rounded-lg p-6 sm:w-72 ${getColor(
        title
      )} ${className} transition-all hover:shadow-lg hover:transform hover:-translate-y-1`}
    >
      <div className="text-3xl mb-4">{getEmoji(title)}</div>
      <div className="text-4xl font-bold">{number}</div>
      <div className="text-sm mt-2">{title}</div>
    </div>
  );
};

const SalesActivity = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const { data } = await getSales();
        setSalesData(data);
      } catch (error) {
        console.error("Failed to fetch sales data:", error);
      }
    };

    fetchSalesData();
  }, []);

  const calculateItemQuantities = (sales) => {
    return sales?.reduce((acc, sale) => {
      const { status, itemQuantity } = sale;
      if (!acc[status]) {
        acc[status] = 0;
      }
      acc[status] += itemQuantity;
      return acc;
    }, {});
  };

  const itemQuantitiesByStatus = calculateItemQuantities(salesData);

  const stats = Object.keys(SALE_TYPE).map((key) => ({
    number: itemQuantitiesByStatus[SALE_TYPE[key]] || 0,
    title: SALE_TYPE[key],
  }));

  return (
    <div className="bg-gray-100 p-4 min-h-72">
      <h2 className="text-xl font-semibold">Sales Activity</h2>
      <motion.div className="flex lg:space-x-4 lg:overflow-x-hidden overflow-x-auto scrollbar-hide whitespace-nowrap gap-4 p-4">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            index={index}
            number={stat.number}
            title={stat.title}
            className="bg-blue-50 flex-shrink-0 lg:flex-shrink "
          />
        ))}
      </motion.div>
    </div>
  );
};

export default SalesActivity;
