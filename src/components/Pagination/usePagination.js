import { useSearchParams } from "react-router-dom";
import qs from "qs";

const usePagination = (defaultLimit = 10, defaultPage = 1) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || defaultPage;
  const limit = Number(searchParams.get("limit")) || defaultLimit;

  const updateUrlParams = (limit, page) => {
    const newParams = { limit, page };
    setSearchParams(newParams);
  };

  const handlePageChange = (page) => {
    updateUrlParams(limit, page);
  };

  const handleLimitChange = (limit) => {
    updateUrlParams(limit, defaultPage);
  };

  const queryString = qs.stringify({ limit, page });

  return {
    page,
    limit,
    handlePageChange,
    handleLimitChange,
    searchParams: queryString,
  };
};

export default usePagination;
