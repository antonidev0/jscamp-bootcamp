import { useFilters } from "../context/FiltersContext.jsx";
import { useState } from "react";
let timeoutId = null; 

export const useSearchForm = () => {
  const {
    filters,
    textToFilter,
    handleFiltersChange,
    handleTextFilter,
    clearAllFilters,
  } = useFilters();

  const [localText, setLocalText] = useState(textToFilter);

  const handleTextChange = (e) => { 
    const value = e.target.value;
    setLocalText(value);

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      handleTextFilter(value);
    }, 500);
  }

  const handleTechnologyChange = (e) =>
    handleFiltersChange({ ...filters, technology: e.target.value });

  const handleLocationChange = (e) =>
    handleFiltersChange({ ...filters, location: e.target.value });

  const handleExperienceChange = (e) =>
        handleFiltersChange({ ...filters, experience: e.target.value });
    
  
    const hasActiveFilters =
      textToFilter !== "" ||
      Object.values(filters).some((value) => value !== "");
 
    const clearFilters = () => {
      handleTextFilter("");
      handleFiltersChange({ technology: "", location: "", experience: "" });
    };


  return {
    filters,
    textToFilter: localText,
    hasActiveFilters,
    clearFilters : clearAllFilters,
    handleTextChange,
    handleTechnologyChange,
    handleLocationChange,
    handleExperienceChange,
  };
};
