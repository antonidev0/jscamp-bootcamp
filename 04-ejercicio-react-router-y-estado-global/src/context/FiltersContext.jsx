// contexts/FilterContext.jsx
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import jobsData from "../data.json";
import { useSearchParams } from "react-router";
import { useRouter } from "../hooks/useRouter.jsx";

const FilterContext = createContext();
function getErrorMessage(error) {
  if (!navigator.onLine) {
    return "No tienes conexión a internet. Verifica tu conexión e intenta de nuevo.";
  }

  const message = error.message;

  if (message.includes("404")) {
    return "No se encontró el recurso solicitado.";
  }
  if (message.includes("500")) {
    return "Error en el servidor. Intenta más tarde.";
  }
  if (message.includes("403")) {
    return "No tienes permisos para acceder a este recurso.";
  }

  return "Ocurrió un error inesperado. Intenta de nuevo.";
}

export function FilterProvider({ children }) {
  const { navigateTo } = useRouter();
  const RESULTS_PER_PAGE = 5;

  const [searchParams, setSearchParams] = useSearchParams();

  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(() => {
    const params = new URLSearchParams(window.location.search);

    return {
      technology: searchParams.get("technology") || "",
      location: searchParams.get("type") || "",
      experience: searchParams.get("level") || "",
    };
  });

  const [textToFilter, setTextToFilter] = useState(
    () => searchParams.get("text") || "",
  );

  const [currentPage, setCurrentPage] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const page = Number(searchParams.get("page"));
    return page > 0 ? page : 1;
  });

  const [jobs, setJobs] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);

  const retry = () => {
    setError(null);
    setRetryCount((prev) => prev + 1);
  };

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (textToFilter) params.append("text", textToFilter);
        if (filters.technology) params.append("technology", filters.technology);
        if (filters.location) params.append("type", filters.location);
        if (filters.experience) params.append("level", filters.experience);

        const offset = (currentPage - 1) * RESULTS_PER_PAGE;
        params.append("limit", RESULTS_PER_PAGE);
        params.append("offset", offset);

        const queryParams = params.toString();

        const response = await fetch(
          `https://jscamp-api.vercel.app/api/jobs?${queryParams}`,
        );

        if (!response.ok) {
          throw new Error(`aaaaaaaaaaaaaaaaaa ${response.status}`);
        }

        const json = await response.json();
        setJobs(json.data);
        setTotal(json.total);
      } catch (error) {
        console.error("Errorrrrrrrrrrrrrrr", error);
        setError(getErrorMessage(error));
        setJobs([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    }
    fetchJobs();
  }, [filters, textToFilter, currentPage, retryCount]);

  useEffect(() => {
    const params = new URLSearchParams();
      if (textToFilter) params.set("text", textToFilter);
      if (filters.technology) params.set("technology", filters.technology);
      if (filters.location) params.set("location", filters.location);
      if (filters.experience) params.set("experience", filters.experience);
      if (currentPage > 1) params.set("page", String(currentPage));

      setSearchParams(params, { replace: true });
    
  }, [filters, textToFilter, currentPage]);

  
  const jobsFilteredByFields = useMemo(
    () => {
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

  useEffect(() => {
    try {
      localStorage.setItem("jobFilters", JSON.stringify(filters));
    } catch (e) {
      console.error("Error guardando filtros:", e);
    }
  }, [filters]);

  useEffect(() => {
    try {
      localStorage.setItem("jobTextFilter", textToFilter);
    } catch (e) {
      console.error("Error guardando texto:", e);
    }
  }, [textToFilter]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearAllFilters = () => {
    setFilters({ technology: "", location: "", experience: "" });
    setTextToFilter("");
    setCurrentPage(1);
    localStorage.removeItem("jobFilters");
    localStorage.removeItem("jobTextFilter");
  };

  const value = {
    total,
    loading,
    filters,
    textToFilter,
    currentPage,
    totalPages,
    jobs,
    error,
    retry,
    clearAllFilters,
    handleFiltersChange,
    handleTextFilter,
    handlePageChange,
  };

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
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
