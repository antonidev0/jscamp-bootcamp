// contexts/FilterContext.jsx
import { createContext, useContext, useState, useMemo, useEffect } from "react";
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

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);

        const params = new URLSearchParams()
        if (textToFilter) params.append('text', textToFilter)
        if (filters.technology) params.append('technology', filters.technology)
        if (filters.location) params.append('type', filters.location)
        if (filters.experience) params.append('level', filters.experience)
          
        const offset = (currentPage - 1) * RESULTS_PER_PAGE
        params.append('limit', RESULTS_PER_PAGE)
        params.append('offset', offset)

        const queryParams = params.toString()
        
        const response = await fetch(`https://jscamp-api.vercel.app/api/jobs?${queryParams}`);
        const json = await response.json();
        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [filters, textToFilter, currentPage]);



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
   
    // Cálculos de paginación
    const totalPages = Math.ceil(total / RESULTS_PER_PAGE);
 
  

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
      total,
      loading,
      filters,
      textToFilter,
      currentPage,
      totalPages, 
      jobs,
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
