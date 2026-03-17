
import { useEffect, useState } from "react";
import { Header } from "../src/components/Header.jsx";
import { HomePage } from "../src/pages/Home.jsx";
import { Footer } from "./components/Footer.jsx";
import { SearchPage } from "../src/pages/Search.jsx";
import { NotFound } from "./pages/404.jsx";
import { useRouter } from "./hooks/useRouter.jsx";
import { Route } from "./components/Route.jsx";
import { Contact } from "./pages/Contact.jsx";

// Componente principal que provee el contexto

function App() { 
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} exact={false} />
      <Route path="/search" component={SearchPage} />
      <Route path="/contact" component={Contact}  />
      <Footer />
    </>
  );
}

export default App;
