import { useSearchParams } from "react-router-dom";

const useSearch = (defaultSearch = "") => {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || defaultSearch;

  const handleSearchChange = (searchQuery) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (searchQuery) {
        newParams.set("search", searchQuery);
      } else {
        newParams.delete("search");
      }
      return newParams;
    });
  };

  const handleSearchInputChange = (event) => {
    handleSearchChange(event.target.value);
  };

  return {
    search,
    handleSearchChange,
    handleSearchInputChange,  
  };
};

export default useSearch;
