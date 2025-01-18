import { useState } from "react";
import { getStocks } from "api/stocks";
import { STOCK_TYPE } from "constants/statuses";
import jsPDF from "jspdf";
import "jspdf-autotable";

const useStockReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateStockReport = async (dateRange) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: stocks } = await getStocks();

      const filteredStocks = stocks.filter((stock) => {
        const createdAtSeconds = stock?.createdAt._seconds;
        console.log(stock.createdAt);
        const createdAt = new Date(createdAtSeconds * 1000);

        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);

        return createdAt >= fromDate && createdAt <= toDate;
      });

      console.log(filteredStocks);

      if (!filteredStocks || filteredStocks.length === 0) {
        setError("No data available for the selected date range.");
        return;
      }

      const groupedStocks = {
        [STOCK_TYPE.InStock]: [],
        [STOCK_TYPE.OutOfStock]: [],
        [STOCK_TYPE.ToBeDelivered]: [],
        [STOCK_TYPE.OnOrder]: [],
      };

      filteredStocks.forEach((stock) => {
        groupedStocks[stock.status].push(stock);
      });

      const hasData = Object.values(groupedStocks).some(
        (items) => items.length > 0
      );

      if (!hasData) {
        setError("No data available for the selected date range.");
        return;
      }

      const doc = new jsPDF();

      doc.setFontSize(18);
      doc.text("Stock Report", 10, 10);

      doc.setFontSize(11);
      doc.text(`Date Range: ${dateRange.from} to ${dateRange.to}`, 10, 20);

      let yPosition = 30;

      Object.entries(groupedStocks).forEach(([status, items]) => {
        if (items.length > 0) {
          doc.setFontSize(14);
          doc.text(`${status} (${items.length} items)`, 10, yPosition);
          yPosition += 10;

          const tableData = items.map((item) => [
            item.stockID,
            item.item,
            item.totalQuantity,
            item.unit,
            item.location,
            item.supplier,
          ]);

          doc.autoTable({
            startY: yPosition,
            head: [
              ["Stock ID", "Item", "Quantity", "Unit", "Location", "Supplier"],
            ],
            body: tableData,
          });

          yPosition = doc.lastAutoTable.finalY + 10;
        }
      });

      doc.save("stock_report.pdf");
    } catch (err) {
      setError("Failed to generate the stock report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { generateStockReport, isLoading, error };
};

export default useStockReport;
