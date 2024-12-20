import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { deleteCategory } from "api/category";

function useDeleteCategory(triggerRefetch) {
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

  const deleteCategoryHandle = async () => {
    const { id } = item;
    setIsLoading(true);
    try {
      await deleteCategory(id);
      triggerRefetch();
      toggleOpen();
      toast.success("Category deleted successfully!");
    } catch (error) {
      toast.error(
        "Failed to delete category: " + (error.message || "An error occurred.")
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
    onDelete: deleteCategoryHandle,
  };
}

export default useDeleteCategory;