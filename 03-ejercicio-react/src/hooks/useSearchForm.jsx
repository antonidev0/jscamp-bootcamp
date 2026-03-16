import { useFilters } from "../context/FiltersContext.jsx";

export const useSearchForm = () => {
  const {
    filters,
    textToFilter,
    handleFiltersChange,
    handleTextFilter,
    clearAllFilters,
  } = useFilters();

  const handleTextChange = (e) => handleTextFilter(e.target.value);

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
    textToFilter,
    hasActiveFilters,
    clearFilters : clearAllFilters,
    handleTextChange,
    handleTechnologyChange,
    handleLocationChange,
    handleExperienceChange,
  };
};
