import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getItem, updateItem } from "api/item";

function useEditItem(triggerRefetch) {
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItems] = useState({
    isOpen: false,
    id: null,
  });
  const { isOpen, id } = item;

  function toggleOpen(itemID) {
    if (typeof itemID === "number") {
      setItems({ isOpen: true, id: itemID });
      setIsLoading(false);
    } else {
      setItems({ isOpen: false, id: null });
      setData({});
      setIsLoading(false);
    }
  }

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getItem(id);
      setData(data);
    } catch (error) {
      toast.error(
        "Failed to get item: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const editItem = async (formData) => {
    console.log(formData);
    setIsEditing(true);
    try {
      const { itemImages,  ...rest } = formData;
      const itemData = {
        ...rest,
      };

      const formDataToSend = new FormData();
      Object.entries(itemData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (itemImages && Array.isArray(itemImages)) {
        itemImages.forEach((image) => {
          formDataToSend.append("itemImages", image);
        });
      }

      await updateItem(id, formDataToSend);
      triggerRefetch();
      toggleOpen(null);
      toast.success("Item updated successfully!");
    } catch (error) {
      toast.error(
        "Failed to update item: " + (error.message || "An error occurred.")
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

export default useEditItem;
