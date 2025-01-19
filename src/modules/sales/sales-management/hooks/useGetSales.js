import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { getSales } from "api/sales";
import { toast } from "react-toastify";
import usePagination from "components/Pagination/usePagination";
import useSearch from "components/SearchBar/useSearch";
import qs from "qs";

const useGetSales = () => {
  const { paginationParams } = usePagination();
  const { queryString, searchKey } = useSearch("saleSearch");
  const [sales, setSales] = useState([]);
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

  const fetchSales = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryString = qs.stringify(queryParams);
      const { data, meta } = await getSales(queryString);
      setSales(data);
      setMeta(meta);
    } catch (err) {
      toast.error(
        "Failed to fetch Sales: " + (err.message || "An error occurred.")
      );
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  }, [queryParams]);

  useEffect(() => {
    if (
      JSON.stringify(queryParams) !== JSON.stringify(prevQueryParams.current)
    ) {
      fetchSales();
      prevQueryParams.current = queryParams;
    }
  }, [queryParams, fetchSales]);

  return { sales, isLoading, refetch: fetchSales, meta };
};

export default useGetSales;
