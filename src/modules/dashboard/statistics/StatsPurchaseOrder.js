import React, { useEffect, useState } from "react";
import CardContainer from "components/Cards/CardContainer";
import { getSales } from "api/sales";
import { motion } from "framer-motion";

function StatsPurchaseOrder() {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchTotalRevenue = async () => {
      const { data } = await getSales();

      const deliveredOrders = data.filter(
        (sale) => sale.status === "Delivered"
      );
      const revenue = deliveredOrders.reduce(
        (sum, sale) => sum + parseFloat(sale.totalAmount),
        0
      );

      setTotalRevenue(revenue);
    };

    fetchTotalRevenue();
  }, []);

  return (
    <div className="h-full">
      <CardContainer title={"Total Revenue"}>
        <motion.div
          className="flex flex-col h-full justify-center items-center p-6 rounded-lg"
          style={{
            background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-3xl font-bold text-white">
            ₱{totalRevenue.toFixed(2)}
          </div>
          <motion.div
            className="text-sm text-white opacity-80 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Revenue from delivered orders
          </motion.div>
        </motion.div>
      </CardContainer>
    </div>
  );
}

export default StatsPurchaseOrder;