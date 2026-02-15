import Header from "../src/components/Header.jsx";
import { HomePage } from "../src/pages/Home.jsx";
import Footer from "./components/Footer.jsx";

// Componente principal que provee el contexto
function App() {
  return (
    <>
      <Header />
      <HomePage />
      <Footer />
    </>
  );
}

export default App;
