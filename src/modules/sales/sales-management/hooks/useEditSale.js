import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getSale, updateSale } from "api/sales";

function useEditSale(triggerRefetch) {
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sale, setSale] = useState({
    isOpen: false,
    id: null,
  });
  const { isOpen, id } = sale;

  function toggleOpen(saleID) {
    if (typeof saleID === "number") {
      setSale({ isOpen: true, id: saleID });
      setIsLoading(false);
    } else {
      setSale({ isOpen: false, id: null });
      setData({});
      setIsLoading(false);
    }
  }

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getSale(id);
      setData(data);
    } catch (error) {
      toast.error(
        "Failed to get sale: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const editSale = async (formData) => {
    setIsEditing(true);
    try {
      await updateSale(id, formData);
      triggerRefetch();
      toggleOpen(null);
      toast.success("Sale updated successfully!");
    } catch (error) {
      toast.error(
        "Failed to update sale: " + (error.message || "An error occurred.")
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
    onEdit: editSale,
    isFetching: isLoading,
    isEditing,
    data,
    isEditOpen: isOpen,
    toggleEdit: toggleOpen,
  };
}

export default useEditSale;
