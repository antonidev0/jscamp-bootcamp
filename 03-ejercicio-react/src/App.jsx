import { useState } from "react";
import Header from "./components/Header.jsx";
import SearchFormSection from "./components/SearchFormSection.jsx";
import SearchResultsSection from "./components/SearchResultsSection.jsx";
import Footer from "./components/Footer.jsx";
import Pagination from "./components/Pagination.jsx";
import jobsData from "./data.json";
import JobListings from "./components/JobListings.jsx";

const RESULTS_PER_PAGE = 5;

function App() {

  const [filters, setFilters] = useState({ 
    technology: "",
    location: "",
    experience: "",
  });

  const [textToFilter, setTextToFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);


 const jobsFiltersByFilters = jobsData.filter(job => {
    return (
      (filters.technology === "" || job.data.technology === filters.technology.toLowerCase()) &&
      (filters.location === "" || job.data.modalidad === filters.location.toLowerCase()) &&
      (filters.experience === "" || job.data.nivel === filters.experience.toLowerCase())
    )
  });


  const jobsWithTextFilter = textToFilter === ''
    ? jobsFiltersByFilters
    : jobsFiltersByFilters.filter((job) => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    });
  
  const totalPages = Math.ceil(jobsWithTextFilter.length / RESULTS_PER_PAGE);

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )
  const handlePageChange = (page) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
  };


  const handleSearch = (filters) => { 
    setCurrentPage(1);
    setFilters(filters);
    console.log("Search filters updated:", filters);
  }



  const handleTextFilter = (newTextToFilter) => { 
    setTextToFilter(newTextToFilter);
    setCurrentPage(1);
  } 

  return (
    <>
      <Header />
      <main>
        <SearchFormSection onSearch={handleSearch} onTextFilter={handleTextFilter} />

        <section>
          <JobListings jobs={pagedResults} />
        </section>
      </main>
      <Pagination currentPage={pagedResults} totalPages={totalPages} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}

export default App;
