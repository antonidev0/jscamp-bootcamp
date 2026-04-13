import { Routes, Route } from "react-router";
import { lazy, Suspense, useEffect, useState } from "react";   
import { useRouter } from "./hooks/useRouter.jsx";  

const HomePage = lazy(() => import("../src/pages/Home.jsx"));
const Header = lazy(() => import("../src/components/Header.jsx"));
const Footer = lazy(() => import("./components/Footer.jsx"));
const SearchPage = lazy(() => import("../src/pages/Search.jsx"));
const NotFound = lazy(() => import("./pages/404.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const JobDetail = lazy(() => import("./pages/Detail.jsx"));

// Componente principal que provee el contexto

function App() { 

  return (
    <>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage/>} exact={false} />
          <Route path="/search" element={<SearchPage/>} />
          <Route path="/contact" element={<Contact/>} />
          <Route path="/jobs/:jobId" element={<JobDetail/>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
