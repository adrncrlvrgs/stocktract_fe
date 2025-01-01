import { useState } from "react";
import { toast } from "react-toastify";
import { deleteStock } from "api/stocks";

function useDeleteStock(triggerRefetch) {
  const [isLoading, setIsLoading] = useState(false);
  const [stock, setStock] = useState({
    isOpen: false,
    id: null,
  });

  function toggleOpen(id = "") {
    if (typeof id === "object") {
      setStock({ isOpen: false, id: null });
    } else if (typeof id === "number") {
      setStock({ isOpen: true, id });
    } else {
      setStock({ isOpen: !!id, id });
    }
  }

  const deleteStockHandle = async () => {
    const { id } = stock;
    setIsLoading(true);
    try {
      await deleteStock(id);
      triggerRefetch();
      toggleOpen();
      toast.success("Stock deleted successfully!");
    } catch (error) {
      toast.error(
        "Failed to delete stock: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };
  const { id, isOpen } = stock;
  return {
    isDeleteOpen: isOpen,
    id: id,
    isDeleting: isLoading,
    toggleDelete: toggleOpen,
    onDelete: deleteStockHandle,
  };
}

export default useDeleteStock;
