import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "api/auth";

const useSignUp = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const handleSignUp = async (data) => {
    try {
      await signUpUser(data);
      setSuccess("Successfully signed up");
      navigate("/login");
    } catch (error) {
      setError("Error signing up. Please try again.");
    }
  };

  return { handleSignUp, success, error };
};

export default useSignUp;
