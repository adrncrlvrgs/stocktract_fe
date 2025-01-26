import React, { useState } from "react";
import useStockReport from "../hooks/useStockReport";
import { Input } from "components/Input";
import FormGroup from "components/form/FormGroup";
import { Button } from "components/Button";
import CardContainer from "components/Cards/CardContainer";

function Index() {
  const { generateStockReport, isLoading, error } = useStockReport();
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const handleDateTimeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenerateReport = () => {
    if (!dateRange.from || !dateRange.to) {
      alert("Please select both 'From' and 'To' date and time.");
      return;
    }

    generateStockReport(dateRange);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Stock Report</h2>
        <p className="text-sm text-gray-600">
          Generate a detailed stock report in PDF format by selecting a date and
          time range.
          <br />
          The report will include all stock activities within the specified
          period.
        </p>
      </div>
      <CardContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <FormGroup label={"From Date and Time"}>
            <Input
              type="datetime-local"
              name="from"
              value={dateRange.from}
              onChange={handleDateTimeChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
          <FormGroup label={"To Date and Time"}>
            <Input
              type="datetime-local"
              name="to"
              value={dateRange.to}
              onChange={handleDateTimeChange}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </FormGroup>
        </div>

        <div className="flex items-center justify-between">
          <Button
            onClick={handleGenerateReport}
            disabled={isLoading}
            className={`px-6 py-2 rounded-md text-white font-semibold ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 transition-colors"
            }`}
          >
            {isLoading ? "Generating Report..." : "Generate Stock Report (PDF)"}
          </Button>

          {error && <p className="text-red-500">{error}</p>}
        </div>
      </CardContainer>
    </div>
  );
}

export default Index;
