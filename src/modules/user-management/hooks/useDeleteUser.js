import { useState } from "react";
import { toast } from "react-toastify";
import { deleteUser } from "api/user";

function useDeleteUser(triggerRefetch) {
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

  const deleteUserHandle = async () => {
    const { id } = item;
    setIsLoading(true);
    try {
      await deleteUser(id);
      triggerRefetch();
      toggleOpen();
      toast.success("User deleted successfully!");
    } catch (error) {
      toast.error(
        "Failed to delete user: " + (error.message || "An error occurred.")
      );
      setIsLoading(false);
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
    onDelete: deleteUserHandle,
  };
}

export default useDeleteUser;
