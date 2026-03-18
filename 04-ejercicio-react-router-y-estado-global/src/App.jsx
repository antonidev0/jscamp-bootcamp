import { Routes, Route } from "react-router";
import { useEffect, useState } from "react";
import { Header } from "../src/components/Header.jsx";
import { HomePage } from "../src/pages/Home.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchPage } from "../src/pages/Search.jsx";
import { NotFound } from "./pages/404.jsx";
import { useRouter } from "./hooks/useRouter.jsx"; 
import { Contact } from "./pages/Contact.jsx"; 
import { JobDetail } from "./pages/Details.jsx";

// Componente principal que provee el contexto

function App() { 
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<HomePage/>} exact={false} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/jobs/:id" element={<JobDetail/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
