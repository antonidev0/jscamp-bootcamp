import { useFilters } from "../context/FiltersContext.jsx";

export const useSearchForm = () => {
  const { filters, textToFilter, handleFiltersChange, handleTextFilter } =
    useFilters();

  const handleTextChange = (e) => handleTextFilter(e.target.value);

  const handleTechnologyChange = (e) =>
    handleFiltersChange({ ...filters, technology: e.target.value });

  const handleLocationChange = (e) =>
    handleFiltersChange({ ...filters, location: e.target.value });

  const handleExperienceChange = (e) =>
        handleFiltersChange({ ...filters, experience: e.target.value });
    
    
  return {
    filters,
    textToFilter,
    handleTextChange,
    handleTechnologyChange,
    handleLocationChange,
    handleExperienceChange,
  };
};
