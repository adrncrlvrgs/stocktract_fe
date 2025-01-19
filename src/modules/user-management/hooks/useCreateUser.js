import React, { useState } from "react";
import { toast } from "react-toastify";
import { addUser } from "api/user";
import generateUserId from "utils/generateID";

function useCreateUser(triggerRefetch) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const createUser = async (formData) => {
    setIsLoading(true);

    try {
      const { profileImagePath, ...rest } = formData;

      const userID = generateUserId();
      const userData = {
        ...rest,
        userID,
      };

      const formDataToSend = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (profileImagePath instanceof File) {
        formDataToSend.append("profileImagePath", profileImagePath);
      }

      await addUser(formDataToSend);
      setIsLoading(false);
      toggleOpen();
      triggerRefetch();
      toast.success("User created successfully!");
    } catch (error) {
      toast.error(
        "Failed to create user: " + (error.message || "An error occurred.")
      );
      setIsLoading(false);
    }
  };

  return {
    onCreate: createUser,
    isCreating: isLoading,
    isCreateOpen: isOpen,
    toggleCreate: toggleOpen,
  };
}

export default useCreateUser;
