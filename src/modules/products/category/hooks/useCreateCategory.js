import { useState } from "react";
import { toast } from "react-toastify";
import { addCategory } from "api/category";
import generateCategoryId from "utils/generateID";

function useCreateCategory(triggerRefetch) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const createCategory = async (formData) => {
    setIsLoading(true);
   
    try {
      const categoryID = generateCategoryId()
      const categoryData = { ...formData, categoryID: categoryID };
      await addCategory(categoryData);
      setIsLoading(false);
      toggleOpen();
      triggerRefetch();
      toast.success("Category created successfully!");
    } catch (error) {
      toast.error(
        "Failed to create category: " + (error.message || "An error occurred.")
      );
    }
  };

  return {
    onCreate: createCategory,
    isCreating: isLoading,
    isCreateOpen: isOpen,
    toggleCreate: toggleOpen,
  };
}

export default useCreateCategory;