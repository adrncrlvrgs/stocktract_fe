import { useState, useEffect, useRef, useCallback } from "react";
import { getUsers } from "api/user";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);  // To ensure data fetch happens only once

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getUsers();  // Make sure this returns the data correctly
      console.log("Fetched users:", response); // Debugging
      setUsers(response);  // Assuming response contains the correct user data
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUsers();  // Fetch data only once when the component mounts
      hasFetched.current = true;
    }
  }, [fetchUsers]);

  return { users, isLoading, refetch: fetchUsers };
};

export default useGetUsers;
