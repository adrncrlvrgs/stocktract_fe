import { useState } from "react";
import { toast } from "react-toastify";
import { deleteSale } from "api/sales";

function useDeleteSale(triggerRefetch) {
  const [isLoading, setIsLoading] = useState(false);
  const [sale, setSale] = useState({
    isOpen: false,
    id: null,
  });

  function toggleOpen(id = "") {
    if (typeof id === "object") {
      setSale({ isOpen: false, id: null });
    } else if (typeof id === "number") {
      setSale({ isOpen: true, id });
    } else {
      setSale({ isOpen: !!id, id });
    }
  }

  const deleteSaleHandle = async () => {
    const { id } = sale;
    setIsLoading(true);
    try {
      await deleteSale(id);
      triggerRefetch();
      toggleOpen();
      toast.success("Sale deleted successfully!");
    } catch (error) {
      toast.error(
        "Failed to delete sale: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };
  const { id, isOpen } = sale;
  return {
    isDeleteOpen: isOpen,
    id: id,
    isDeleting: isLoading,
    toggleDelete: toggleOpen,
    onDelete: deleteSaleHandle,
  };
}

export default useDeleteSale;
