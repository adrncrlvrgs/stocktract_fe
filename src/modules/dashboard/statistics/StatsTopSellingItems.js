import React, { useEffect, useState } from "react";
import CardContainer from "components/Cards/CardContainer";
import { getSales } from "api/sales";
import { motion, AnimatePresence } from "framer-motion";

function StatsTopSellingItems() {
  const [topSellingItems, setTopSellingItems] = useState([]);

  useEffect(() => {
    const fetchTopSellingItems = async () => {
      const { data } = await getSales();

      const itemSalesMap = new Map();
      data.forEach((sale) => {
        const item = sale.items;
        const itemID = item.itemID;
        const quantitySold = sale.itemQuantity;

        if (itemSalesMap.has(itemID)) {
          itemSalesMap.set(itemID, {
            ...item,
            totalQuantitySold:
              itemSalesMap.get(itemID).totalQuantitySold + quantitySold,
          });
        } else {
          itemSalesMap.set(itemID, {
            ...item,
            totalQuantitySold: quantitySold,
          });
        }
      });

      const sortedItems = Array.from(itemSalesMap.values()).sort(
        (a, b) => b.totalQuantitySold - a.totalQuantitySold
      );

      const top5 = sortedItems.slice(0, 5);
      setTopSellingItems(top5);
    };

    fetchTopSellingItems();
  }, []);

  return (
    <div className="h-full">
      <CardContainer title={"Top Selling Items"}>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-3"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          <AnimatePresence>
            {topSellingItems.map((item) => (
              <motion.div
                key={item.itemID}
                className="flex flex-col items-center space-y-2"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                exit={{ opacity: 0, y: -20 }}
              >
                <img
                  src={item.imageUrls[0]}
                  alt={item.item}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="w-full text-center">
                  <p className="font-semibold text-gray-800 truncate max-w-[150px]">
                    {item.item}
                  </p>
                </div>
                <p className="text-gray-700">
                  <strong>{item.totalQuantitySold}</strong> {item.unit}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </CardContainer>
    </div>
  );
}

export default StatsTopSellingItems;