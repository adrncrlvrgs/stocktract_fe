import React, { useState } from "react";
import { toast } from "react-toastify";
import { addUser } from "api/user";
import generateUserId from "utils/generateID";
import fileToBase64 from "utils/fileToBase64";

function useCreateUser(triggerRefetch) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  const createUser = async (formData) => {
    setIsLoading(true);
   
    try {
      const { profileImagePath, ...rest } = formData;

      let profileImageBase64 = "";
      if (profileImagePath instanceof File) {
        profileImageBase64 = await fileToBase64(profileImagePath);
      }

      const userID = generateUserId();
      const userData = {
        ...rest,
        userID,
        profileImage: profileImageBase64, 
      };
      await addUser(userData);
      setIsLoading(false);
      toggleOpen();
      triggerRefetch();
      toast.success("User created successfully!");
    } catch (error) {
      toast.error(
        "Failed to create user: " + (error.message || "An error occurred.")
      );
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
