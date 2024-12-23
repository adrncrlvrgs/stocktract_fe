import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getItems } from "api/item";
import usePagination from "components/Pagination/usePagination";
import useSearch from "components/SearchBar/useSearch";
import qs from "qs";

const useGetItems = () => {
  const { paginationParams } = usePagination();
  const { queryString, searchKey } = useSearch("itemSearch");
  const [items, setItems] = useState([]);
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

  const fetchItems = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryString = qs.stringify(queryParams);
      const { data, meta } = await getItems(queryString);
      setItems(data);
      setMeta(meta);
    } catch (err) {
      console.error("Error fetching items:", err);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    if (
      JSON.stringify(queryParams) !== JSON.stringify(prevQueryParams.current)
    ) {
      fetchItems();
      prevQueryParams.current = queryParams;
    }
  }, [queryParams, fetchItems]);

  return { items, isLoading, refetch: fetchItems, meta };
};

export default useGetItems;