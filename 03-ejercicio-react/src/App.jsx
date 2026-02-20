import { useEffect, useState } from "react";
import { Header } from "../src/components/Header.jsx";
import { HomePage } from "../src/pages/Home.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchPage } from "../src/pages/Search.jsx";
import { NotFound } from "./pages/404.jsx";

// Componente principal que provee el contexto
function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);
 
  let page = <NotFound />;

  if (currentPath === "/") {
    page = <HomePage />;
  } else if (currentPath === "/search") { 
    page = <SearchPage />;
  }

  useEffect(() => {
    
    window.addEventListener("popstate", () => {
      console.log("paaa"); 
    });
    
  }, []);


     
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
}

export default App;
