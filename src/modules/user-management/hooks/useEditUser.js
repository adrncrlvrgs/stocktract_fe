import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getUser, updateUser } from "api/user";

function useEditUser(triggerRefetch) {
  const [data, setData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [item, setItems] = useState({
    isOpen: false,
    id: null,
  });
  const { isOpen, id } = item;

  function toggleOpen(userID) {
    if (typeof userID === "number") {
      setItems({ isOpen: true, id: userID });
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
      const data = await getUser(id);
      setData(data);
    } catch (error) {
      toast.error(
        "Failed to get user: " + (error.message || "An error occurred.")
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  const editUser = async (formData) => {
    setIsEditing(true);
    try {
      const { password, profileImagePath, ...rest } = formData;

      const formDataToSend = new FormData();

      Object.entries(rest).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (password) {
        formDataToSend.append("password", password);
      }

      if (profileImagePath instanceof File) {
        formDataToSend.append("profileImagePath", profileImagePath);
      }

      await updateUser(id, formDataToSend);
      triggerRefetch();
      toggleOpen(null);
      toast.success("Post updated successfully!");
    } catch (error) {
      toast.error(
        "Failed to update post: " + (error.message || "An error occurred.")
      );
      setIsLoading(false);
      setIsEditing(false)
    } finally {
      setIsLoading(false);
      setIsEditing(false);
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
