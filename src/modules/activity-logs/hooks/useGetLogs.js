import { useState, useEffect, useCallback } from "react";
import { getLogs } from "api/logs";
import usePagination from "components/Pagination/usePagination";
import qs from "qs";

const useGetLogs = () => {
  const { paginationParams } = usePagination();
  const [logs, setLogs] = useState([]);
  const [meta, setMeta] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const queryString = qs.stringify(paginationParams);
  const fetchLogs = useCallback(async () => {
    setIsLoading(true);
    try {
      
      const { data, meta } = await getLogs(queryString);
      setLogs(data);
      setMeta(meta);
    } catch (err) {
      console.error("Error fetching logs:", err);
    } finally {
      setIsLoading(false);
    }
  }, [queryString]); 

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]); 

  return {
    logs,
    isLoading,
    refetch: fetchLogs,
    meta,
  };
};

export default useGetLogs;
