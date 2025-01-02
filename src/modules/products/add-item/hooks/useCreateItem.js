import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addItem } from "api/item";
import { getStock } from "api/stocks";
import generateItemId from "utils/generateID";

function useCreateItem(triggerRefetch) {
  const [data, setData] = useState({});
  const [isCreating, setIsCreating] = useState(false);
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
      const data = await getStock(id);
      setData(data);
    } catch (error) {
      toast.error(
        "Failed to get item: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const createItem = async (formData) => {
    setIsCreating(true);

    try {
      const itemID = generateItemId();
      const itemData = {
        ...formData,
        ...data,
        availableQuantity: data?.totalQuantity,
        stockID: data?.stockID,
        itemID: itemID,
      };
      await addItem(itemData);
      setIsLoading(false);
      toggleOpen();
      triggerRefetch();
      toast.success("Item created successfully!");
    } catch (error) {
      toast.error(
        "Failed to create item: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    if (id) getData();
  }, [id]);

  return {
    onCreate: createItem,
    isFetching: isLoading,
    isCreating,
    data,
    isCreatingOpen: isOpen,
    toggleCreate: toggleOpen,
  };
}

export default useCreateItem;
