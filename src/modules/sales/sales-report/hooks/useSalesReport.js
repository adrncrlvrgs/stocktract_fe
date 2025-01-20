import { useState } from "react";
import { getSales } from "api/sales";
import { SALE_TYPE } from "constants/statuses";
import jsPDF from "jspdf";
import "jspdf-autotable";

const useSalesReport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateSalesReport = async (dateRange) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: sales } = await getSales();

      const filteredSales = sales.filter((sale) => {
        const createdAtSeconds = sale?.createdAt._seconds;
        const createdAt = new Date(createdAtSeconds * 1000);

        const fromDate = new Date(dateRange.from);
        const toDate = new Date(dateRange.to);

        return createdAt >= fromDate && createdAt <= toDate;
      });

      if (!filteredSales || filteredSales.length === 0) {
        setError("No data available for the selected date range.");
        return;
      }

      const groupedSales = {
        [SALE_TYPE.Ordered]: [],
        [SALE_TYPE.ToBePacked]: [],
        [SALE_TYPE.ToBeDelivered]: [],
        [SALE_TYPE.Delivered]: [],
        [SALE_TYPE.Returned]: [],
        [SALE_TYPE.Canceled]: [],
      };

      filteredSales.forEach((sale) => {
        groupedSales[sale.status].push(sale);
      });

      const hasData = Object.values(groupedSales).some(
        (items) => items.length > 0
      );

      if (!hasData) {
        setError("No data available for the selected date range.");
        return;
      }

      const doc = new jsPDF();

      doc.setFont("Arial");

      doc.setFontSize(18);
      doc.text("Sales Report", 10, 10);

      doc.setFontSize(11);
      doc.text(`Date Range: ${dateRange.from} to ${dateRange.to}`, 10, 20);

      let yPosition = 30;

      Object.entries(groupedSales).forEach(([status, items]) => {
        if (items.length > 0) {
          doc.setFontSize(14);
          doc.text(`${status} (${items.length} items)`, 10, yPosition);
          yPosition += 10;

          const tableData = items.map((sale) => [
            sale.saleID,
            sale.items.item,
            sale.itemQuantity,
            `Php: ${sale.items.price.toLocaleString()}`,
            `Php: ${sale.totalAmount.toLocaleString()}`,
            new Date(sale.createdAt._seconds * 1000).toLocaleString(),
          ]);

          doc.autoTable({
            startY: yPosition,
            head: [
              [
                "Sale ID",
                "Item",
                "Quantity",
                "Price",
                "Total Amount",
                "Created At",
              ],
            ],
            body: tableData,
          });

          yPosition = doc.lastAutoTable.finalY + 10;
        }
      });

      doc.save("sales_report.pdf");
    } catch (err) {
      setError("Failed to generate the sales report. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { generateSalesReport, isLoading, error };
};

export default useSalesReport;