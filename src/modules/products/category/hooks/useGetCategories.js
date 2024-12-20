import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getCategories } from "api/category";
import usePagination from "components/Pagination/usePagination";
import useSearch from "components/SearchBar/useSearch";
import qs from "qs";

const useGetCategories = () => {
  const { paginationParams } = usePagination();
  const { queryString, searchKey } = useSearch("categorySearch");
  const [categories, setCategories] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const prevQueryParams = useRef(null);
  const queryParams = useMemo(() => {
    const params = { ...paginationParams };
    if (queryString[searchKey]) {
      params.search = queryString[searchKey];
    }
    return params;
  }, [paginationParams, queryString]);

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryString = qs.stringify(queryParams);
      const { data, meta } = await getCategories(queryString);
      setCategories(data);
      setMeta(meta);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    if (
      JSON.stringify(queryParams) !== JSON.stringify(prevQueryParams.current)
    ) {
      fetchCategories();
      prevQueryParams.current = queryParams;
    }
  }, [queryParams, fetchCategories]);

  return { categories, isLoading, refetch: fetchCategories, meta };
};

export default useGetCategories;
