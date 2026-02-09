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

  const [textToFilter, setTextToFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const jobsWithTextFilter = textToFilter === ''
    ? jobsData
    : jobsData.filter((job) => {
      return job.titulo.toLowerCase().includes(textToFilter.toLowerCase())
    });
  
  const totalPages = Math.ceil(jobsData.length / RESULTS_PER_PAGE);

  const pagedResults = jobsWithTextFilter.slice(
    (currentPage - 1) * RESULTS_PER_PAGE,
    currentPage * RESULTS_PER_PAGE
  )
  const handlePageChange = (page) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
  };


  const handleSearch = () => { 
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
