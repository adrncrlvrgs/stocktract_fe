import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUser, updateUser } from "api/user";

function useEditUser(triggerRefetch) {
  const [data, setData] = useState({});
  const [isEditing, setIdEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItems] = useState({
    isOpen: false,
    id: null,
  });
  const { isOpen, id } = item;

  function toggleOpen(userID) {
    if (typeof userID === "number") {
      setItems({ isOpen: true, id: userID });
    } else {
      setItems({ isOpen: false, id: null });
      setData({});
    }
  }

  const getData = async () => {
    try {
      setIsLoading(true);
      const data = await getUser(id);
      setData(data);
    } catch (error) {
      toast.error(
        "Failed to get user: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (formData) => {
    setIdEditing(true);
    try {
      const { password, ...rest } = formData;
      const payload = {
        ...rest,
        ...(password ? { password } : {}),
      };

      console.log(id)
      await updateUser(id, payload);
      triggerRefetch();
      toggleOpen(null);
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error(
        "Failed to update post: " + (error.message || "An error occurred.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) getData();
  }, [id]);

  return {
    onEdit: editUser,
    isFetching: isLoading,
    isEditing,
    data,
    isEditOpen: isOpen,
    toggleEdit: toggleOpen,
  };
}

export default useEditUser;
