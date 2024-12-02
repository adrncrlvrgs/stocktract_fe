import { useState, useEffect, useRef, useCallback } from "react";
import { getUsers } from "api/user";

const useGetUsers = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const hasFetched = useRef(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getUsers();

      setUsers(response);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!hasFetched.current) {
      fetchUsers();
      hasFetched.current = true;
    }
  }, [fetchUsers]);

  return { users, isLoading, refetch: fetchUsers };
};

export default useGetUsers;
