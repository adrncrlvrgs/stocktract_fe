import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getCategory, updateCategory } from "api/category";

function useEditCategory(triggerRefetch) {
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItems] = useState({
    isOpen: false,
    id: null,
  });
  const { isOpen, id } = item;

  function toggleOpen(categoryID) {
    if (typeof categoryID === "number") {
      setItems({ isOpen: true, id: categoryID });
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
      const data = await getCategory(id);
      setData(data);
    } catch (error) {
      toast.error(
        "Failed to get category: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const editCategory = async (formData) => {
    setIsEditing(true);
    try {
      await updateCategory(id, formData);
      triggerRefetch();
      toggleOpen(null);
      toast.success("Category updated successfully!");
    } catch (error) {
      toast.error(
        "Failed to update category: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
      setIsEditing(false);
    }
  }
  useEffect(() => {
    if (id) getData();
  }, [id]);
  
  return {
    onEdit: editCategory,
    isFetching: isLoading,
    isEditing,
    data,
    isEditOpen: isOpen,
    toggleEdit: toggleOpen,
  };
}

export default useEditCategory;