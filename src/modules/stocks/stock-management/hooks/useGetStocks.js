import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getStocks } from "api/stocks";
import usePagination from "components/Pagination/usePagination";
import useSearch from "components/SearchBar/useSearch";
import qs from "qs";

const useGetStocks = () => {
  const { paginationParams } = usePagination();
  const { queryString, searchKey } = useSearch("stockSearch");
  const [stocks, setStocks] = useState([]);
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

  const fetchStocks = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryString = qs.stringify(queryParams);
      const { data, meta } = await getStocks(queryString);
      setStocks(data);
      setMeta(meta);
    } catch (err) {
      console.error("Error fetching stocks:", err);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    if (
      JSON.stringify(queryParams) !== JSON.stringify(prevQueryParams.current)
    ) {
      fetchStocks();
      prevQueryParams.current = queryParams;
    }
  }, [queryParams, fetchStocks]);

  return { stocks, isLoading, refetch: fetchStocks, meta };
};

export default useGetStocks;

