import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "api/auth";
import generateUserId from "utils/generateID";

const useSignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (data) => {
    try {
      const { profileImagePath, ...rest } = data;

      const userID = generateUserId();
      const userData = { 
        ...rest, 
        userID 
      };

      const formDataToSend = new FormData();
      Object.entries(userData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      if (profileImagePath instanceof File) {
        formDataToSend.append("profileImagePath", profileImagePath);
      }
      await signUpUser(formDataToSend);
      setSuccess("Successfully signed up");
      navigate("/");
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  return { handleSignUp, success, error };
};

export default useSignUp;
