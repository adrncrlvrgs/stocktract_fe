import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getUsers } from "api/user";
import usePagination from "components/Pagination/usePagination";
import useSearch from "components/SearchBar/useSearch";
import qs from "qs";

const useGetUsers = () => {
  const { paginationParams } = usePagination();
  const { queryString, searchKey } = useSearch();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const prevQueryParams = useRef(null);
  const queryParams = useMemo(() => {
    const params = { ...paginationParams };
    if (queryString?.search) {
      params.searchKey = queryString.search;
    }
    return params;
  }, [paginationParams, queryString]);

  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryString = qs.stringify(queryParams);
      const { data, meta } = await getUsers(queryString);
      setUsers(data);
      setMeta(meta);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    if (
      JSON.stringify(queryParams) !== JSON.stringify(prevQueryParams.current)
    ) {
      fetchUsers();
      prevQueryParams.current = queryParams;
    }
  }, [queryParams, fetchUsers]);

  return { users, isLoading, refetch: fetchUsers, meta };
};

export default useGetUsers;
