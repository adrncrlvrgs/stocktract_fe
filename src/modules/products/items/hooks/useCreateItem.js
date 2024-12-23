import { useState } from "react";
import { toast } from "react-toastify";
import { addItem } from "api/item";
import generateItemId from "utils/generateID";

function useCreateItem(triggerRefetch) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const createItem = async (formData) => {
    setIsLoading(true);
    
    try {
      const itemID = generateItemId()
      const itemData = { ...formData, itemID: itemID };
      await addItem(itemData);
      setIsLoading(false);
      toggleOpen();
      triggerRefetch();
      toast.success("Item created successfully!");
    } catch (error) {
      toast.error(
        "Failed to create item: " + (error.message || "An error occurred.")
      );
    }
  };

  return {
    onCreate: createItem,
    isCreating: isLoading,
    isCreateOpen: isOpen,
    toggleCreate: toggleOpen,
  };
}

export default useCreateItem;
