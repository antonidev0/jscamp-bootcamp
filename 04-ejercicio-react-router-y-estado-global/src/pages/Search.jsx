/* Pasa tu contenido de src/App.jsx aquí */
import { Header } from "../components/Header.jsx";
import SearchFormSection from "../components/SearchFormSection.jsx";
import { Footer } from "../components/Footer.jsx";
import Pagination from "../components/Pagination.jsx";
import JobListings from "../components/JobListings.jsx";
import { FilterProvider, useFilters } from "../context/FiltersContext.jsx";
import { useEffect } from "react";
import { Spinner } from "../components/Spinner.jsx"

// Componente interno que consume el contexto

function Search() {
  const {
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
    error,
    retry,
  } = useFilters();

 
  if (error) {
    return (
      <div className="error-container">
        <h3>Algo salió mal</h3>
        <p>{error}</p>
        <button onClick={retry}>Reintentar</button>
      </div>
    );
  }

  const title = loading
    ? `Cargando... - DevJobs`
    : `Resultados : ${total}, Pagina ${currentPage} - <DevJobs></DevJobs>`
  return (
    <> 
      <main>
        <title>{ title }</title>
        <SearchFormSection
          filters={filters}
          text={textToFilter}
          onFiltersChange={handleFiltersChange}
          onTextChange={handleTextFilter}
          initialText={textToFilter}
        />

        <section>
          {
            loading ?
              <Spinner/> 
              : <JobListings jobs={jobs} />
          }
 
        </section>
      </main>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      /> 
    </>
  );
}
 
function SearchPage() {
  return (
    <FilterProvider>
      <Search />
    </FilterProvider>
  );
}

export { SearchPage };