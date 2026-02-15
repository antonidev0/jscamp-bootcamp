// contexts/FilterContext.jsx
import { createContext, useContext, useState, useMemo } from "react";
import jobsData from "../data.json";

const FilterContext = createContext();

export function FilterProvider({ children }) { 

  const RESULTS_PER_PAGE = 5;

  const [filters, setFilters] = useState({
    technology: "",
    location: "",
    experience: "",
  });

  const [textToFilter, setTextToFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsFilteredByFields = useMemo(() => {
      return jobsData.filter((job) => {
        return (
          (filters.technology === "" ||
            job.data.technology === filters.technology.toLowerCase()) &&
          (filters.location === "" ||
            job.data.modalidad === filters.location.toLowerCase()) &&
          (filters.experience === "" ||
            job.data.nivel === filters.experience.toLowerCase())
        );
      });
    },
    //   cargo el useMemo con el array de dependencias [filters] para que solo se vuelva a calcular cuando los filtros cambien, evitando cálculos innecesarios en cada renderizado.
    [filters],
  );

  //   // Filtrado por campos (technology, location, experience)

    // Filtrado adicional por texto
    const jobsWithTextFilter = useMemo((text) => {
        if (textToFilter === "") return jobsFilteredByFields;

      return jobsFilteredByFields.filter((job) =>
        job.titulo.toLowerCase().includes(textToFilter.toLowerCase()),
      );
    }, [jobsFilteredByFields, textToFilter]);
  

    // Cálculos de paginación
    const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

    const pagedResults = useMemo(() => {
      return jobsWithTextFilter.slice(
        (currentPage - 1) * RESULTS_PER_PAGE,
        currentPage * RESULTS_PER_PAGE,
      );
    }, [jobsWithTextFilter, currentPage]);
  

    // Funciones para actualizar el estado
    const handleFiltersChange = (newFilters) => {
      setCurrentPage(1);
      setFilters(newFilters);
  };
  

    const handleTextFilter = (newTextToFilter) => {
      setTextToFilter(newTextToFilter);
      setCurrentPage(1);
    };

  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

    const value = {
      filters,
      textToFilter,
      currentPage,
      totalPages,
      pagedResults,
      jobsWithTextFilter,
      handleFiltersChange,
      handleTextFilter,
      handlePageChange,
    };

  return (
    <FilterContext.Provider
      value={value}>
      {children}
    </FilterContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useFilters() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilters debe usarse dentro de un FilterProvider");
  }
  return context;
}
