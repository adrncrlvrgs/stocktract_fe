import { useSearchParams } from "react-router-dom";
import { useCallback, useRef } from "react";
import { debounce } from "lodash";

const useSearch = (defaultSearch,searchKey) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || defaultSearch;
  const isFirstRender = useRef(true);

  const updateUrlParams = (searchQuery) => {
    const newParams = { search: searchQuery };
    setSearchParams(newParams);
  };

  const handleSearchChange = useCallback(
    debounce((searchQuery) => {
      if (isFirstRender.current) {
        isFirstRender.current = false;
        return;
      }

      updateUrlParams(searchQuery);
    }, 300),
    []
  );

  const handleSearchInputChange = (event) => {
    const searchQuery = event.target.value;
    handleSearchChange(searchQuery);
  };

  const queryString = { search };

  return {
    searchKey,
    search,
    handleSearchChange,
    handleSearchInputChange,
    queryString,
  };
};

export default useSearch;
