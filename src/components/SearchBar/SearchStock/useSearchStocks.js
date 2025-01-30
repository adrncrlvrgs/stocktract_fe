import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import { getStocks } from "api/stocks";
import { useNavigate } from "react-router-dom";

export const useSearchStocks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const fetchSuggestions = debounce(async (term) => {
    if (term) {
      try {
        const {data} = await getStocks({ search: term });
        setSuggestions(data);
      } catch (error) {
        toast.error(
          "Failed to fetch suggestions: " + (error.message || "An error occurred.")
        )
      }
    } else {
      setSuggestions([]);
    }
  }, 300); 

  useEffect(() => {
    fetchSuggestions(searchTerm);

    return () => {
      fetchSuggestions.cancel();
    };
  }, [searchTerm]);

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate(`/stocks/stocks-management?search=${searchTerm}`);
    }
  };

  return {
    searchTerm,
    setSearchTerm,
    suggestions,
    handleSearch,
  };
};