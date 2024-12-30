import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getStock, updateStock } from "api/stock";

function useEditStock(triggerRefetch) {
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [stock, setStock] = useState({
    isOpen: false,
    id: null,
  });
  const { isOpen, id } = stock;

  function toggleOpen(stockID) {
    if (typeof stockID === "number") {
      setStock({ isOpen: true, id: stockID });
      setIsLoading(false);
    } else {
      setStock({ isOpen: false, id: null });
      setData({});
      setIsLoading(false);
    }
  }

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getStock(id);
      setData(data);
    } catch (error) {
      toast.error(
        "Failed to get stock: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const editStock = async (formData) => {
    setIsEditing(true);
    try {
      await updateStock(id, formData);
      triggerRefetch();
      toggleOpen(null);
      toast.success("Stock updated successfully!");
    } catch (error) {
      toast.error(
        "Failed to update stock: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  };
  useEffect(() => {
    if (id) getData();
  }, [id]);

  return {
    onEdit: editItem,
    isFetching: isLoading,
    isEditing,
    data,
    isEditOpen: isOpen,
    toggleEdit: toggleOpen,
  };
}

export default useEditStock;
