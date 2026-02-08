import Header from "./components/Header.jsx";
import SearchFormSection from "./components/SearchFormSection.jsx";
import SearchResultsSection from "./components/SearchResultsSection.jsx";
import Footer from "./components/Footer.jsx";
import Pagination from "./components/Pagination.jsx";

function App() {
  const handlePageChange = (page) => {
    console.log("Page changed to:", page);
  };

  return (
    <>
      <Header />
      <main>
        <SearchFormSection />
        <SearchResultsSection />
      </main>
      <Pagination currentPage={10} onPageChange={handlePageChange} />
      <Footer />
    </>
  );
}

export default App;
