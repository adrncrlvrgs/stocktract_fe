import { useState, useEffect, useCallback } from "react";
import { getUsers } from "api/user";
import usePagination from "components/Pagination/usePagination";

const useGetUsers = () => {
  const { searchParams } = usePagination();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, meta } = await getUsers(searchParams);
      setUsers(data);
      setMeta(meta);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams) {
      fetchUsers();
    }
  }, [searchParams, fetchUsers]);

  return { users, isLoading, refetch: fetchUsers, meta };
};

export default useGetUsers;
