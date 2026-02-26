/* Pasa tu contenido de src/App.jsx aquí */
import { Header } from "../components/Header.jsx";
import SearchFormSection from "../components/SearchFormSection.jsx";
import { Footer } from "../components/Footer.jsx";
import Pagination from "../components/Pagination.jsx";
import JobListings from "../components/JobListings.jsx";
import { FilterProvider, useFilters } from "../context/FiltersContext.jsx";
import { useEffect } from "react";

// Componente interno que consume el contexto

function Search() {
  const {
    filters,
    textToFilter,
    currentPage,
    totalPages,
    pagedResults,
    handleFiltersChange,
    handleTextFilter,
    handlePageChange,
  } = useFilters();

 


  return (
    <> 
      <main>
        <SearchFormSection
          filters={filters}
          text={textToFilter}
          onFiltersChange={handleFiltersChange}
          onTextChange={handleTextFilter}
        />

        <section>
          <JobListings jobs={pagedResults} />
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