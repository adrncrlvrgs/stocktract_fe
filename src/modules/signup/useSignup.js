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
      const userID = generateUserId(); 
      const userData = { ...data, userID: userID }; 
      await signUpUser(userData);
      setSuccess("Successfully signed up");
      navigate("/");
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  return { handleSignUp, success, error };
};

export default useSignUp;
