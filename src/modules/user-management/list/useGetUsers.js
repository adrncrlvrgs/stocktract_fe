import { useState, useEffect, useCallback } from "react";
import { getUsers } from "api/user";
import usePagination from "components/Pagination/usePagination";
import useSearch from "components/SearchBar/useSearch";
import qs from "qs";

const useGetUsers = () => {
  const { paginationParams } = usePagination();
  const { search } = useSearch();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = { ...paginationParams, search };
      const queryString = qs.stringify(queryParams);

      const { data, meta } = await getUsers(queryString);
      setUsers(data);
      setMeta(meta);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, [paginationParams, search]);

  useEffect(() => {
    fetchUsers();
  }, [search, paginationParams, fetchUsers]);

  return { users, isLoading, refetch: fetchUsers, meta };
};

export default useGetUsers;
