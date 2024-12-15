import { useSearchParams } from "react-router-dom";
import { useRef } from "react";
import { debounce } from "lodash";

const useSearch = (searchKey, defaultSearch) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || defaultSearch;
  const isFirstRender = useRef(true);

  const updateUrlParams = (searchQuery) => {
    const newParams = { search: searchQuery };
    setSearchParams(newParams);
  };

  const handleSearchChange = debounce((searchQuery) => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      updateUrlParams(searchQuery);
      return;
    }
    updateUrlParams(searchQuery);
  }, 500);

  const handleSearchInputChange = (event) => {
    const searchQuery = event.target.value;
    handleSearchChange(searchQuery);
  };

  const queryString = { [searchKey]: search };

  return {
    searchKey,
    search,
    handleSearchChange,
    handleSearchInputChange,
    queryString,
  };
};

export default useSearch;
