import { useState } from "react";
import Header from "./components/Header.jsx";
import SearchFormSection from "./components/SearchFormSection.jsx";
import SearchResultsSection from "./components/SearchResultsSection.jsx";
import Footer from "./components/Footer.jsx";
import Pagination from "./components/Pagination.jsx";

function App() {

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  const handlePageChange = (page) => {
    console.log("Page changed to:", page);
    setCurrentPage(page);
  };

  return (
    <>
      <Header />
      <main>
        <SearchFormSection />
        <SearchResultsSection />
      </main>
      <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}

export default App;
