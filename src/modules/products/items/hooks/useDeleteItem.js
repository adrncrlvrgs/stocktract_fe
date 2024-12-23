import { useState } from "react";
import { toast } from "react-toastify";
import { deleteItem } from "api/item";

function useDeleteItem(triggerRefetch) {

  const [isLoading, setIsLoading] = useState(false);
  const [item, setItems] = useState({
    isOpen: false,
    id: null,
  });

  function toggleOpen(id = "") {
    if (typeof id === "object") {
      setItems({ isOpen: false, id: null });
    } else if (typeof id === "number") {
      setItems({ isOpen: true, id });
    } else {
      setItems({ isOpen: !!id, id });
    }
  }

  const deleteItemHandle = async () => {
    const { id } = item;
    setIsLoading(true);
    try {
      await deleteItem(id);
      triggerRefetch();
      toggleOpen();
      toast.success("Item deleted successfully!");
    } catch (error) {
      toast.error(
        "Failed to delete item: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };
  const { id, isOpen } = item;
  return {
    isDeleteOpen: isOpen,
    id: id,
    isDeleting: isLoading,
    toggleDelete: toggleOpen,
    onDelete: deleteItemHandle,
  };
}

export default useDeleteItem;