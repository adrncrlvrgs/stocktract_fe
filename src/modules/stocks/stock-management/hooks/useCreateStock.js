import { useState } from "react";
import { toast } from "react-toastify";
import { addStock } from "api/stock";
import generateStockId from "utils/generateID";

function useCreateStock(triggerRefetch) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const createStock = async (formData) => {
    setIsLoading(true);
    
    try {
      const stockID = generateStockId()
      const stockData = { ...formData, stockID: stockID };
      await addStock(stockData);
      setIsLoading(false);
      toggleOpen();
      triggerRefetch();
      toast.success("Stock created successfully!");
    } catch (error) {
      toast.error(
        "Failed to create stock: " + (error.message || "An error occurred.")
      );
    }
  };

  return {
    onCreate: createStock,
    isCreating: isLoading,
    isCreateOpen: isOpen,
    toggleCreate: toggleOpen,
  };
}

export default useCreateStock;