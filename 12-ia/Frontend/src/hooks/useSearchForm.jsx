import { useFilters } from "../context/FiltersContext.jsx";
import { useState, useRef } from "react";

export const useSearchForm = () => {
  const {
    filters,
    textToFilter,
    handleFiltersChange,
    handleTextFilter,
    clearAllFilters,
  } = useFilters();

  const [localText, setLocalText] = useState(textToFilter);
  const timeoutId = useRef(null);

  const handleTextChange = (e) => {
    const value = e.target.value;
    setLocalText(value);

    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      handleTextFilter(value);
    }, 500);
  };

  const handleTechnologyChange = (e) =>
    handleFiltersChange({ ...filters, technology: e.target.value });

  const handleLocationChange = (e) =>
    handleFiltersChange({ ...filters, location: e.target.value });

  const handleExperienceChange = (e) =>
    handleFiltersChange({ ...filters, experience: e.target.value });

  const hasActiveFilters =
    localText !== "" || Object.values(filters).some((value) => value !== "");

  const clearFilters = () => {
    setLocalText("");
    clearAllFilters();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    clearTimeout(timeoutId.current);
    handleTextFilter(localText);
  };

  return {
    filters,
    textToFilter: localText,
    hasActiveFilters,
    clearFilters,
    handleTextChange,
    handleTechnologyChange,
    handleLocationChange,
    handleExperienceChange,
    handleSubmit
  };
};
