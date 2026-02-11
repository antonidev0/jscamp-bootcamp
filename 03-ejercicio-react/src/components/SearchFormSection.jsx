import { useId } from "react";

const SearchFormSection = ({ onSearch, onTextFilter }) => {
  const idText = useId();
  const idTechnology = useId();
  const idLocation = useId();
  const idExperience = useId();

  // todoso los inputs / selects usan este mismo handler. Lee todo el formulario
  // en cada cambio para construir un objeto completo de filtros y notificar
  // al padre sin necesidad de un submit. 
  const handleTextChange = (event) => {
    const form = event.target.form || event.target.closest("form");
    // medida de seguridad adicional para asegurar de que el evento pueda encontrar el formulario más cercano

    const formData = new FormData(form);

    const filters = {
      technology: formData.get(idTechnology) || "",
      location: formData.get(idLocation) || "",
      experience: formData.get(idExperience) || "",
    };

    const text = formData.get(idText) || "";

    onTextFilter(text);
    onSearch(filters);
  };

  return (
    <section className="jobs-search">
      <h1>Encuentra tu próximo trabajo</h1>
      <p>Explora miles de oportunidades en el sector tecnológico.</p>

      <form id="empleos-search-form" role="search">
        <div className="search-bar">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
            <path d="M21 21l-6 -6" />
          </svg>

          <input
            id="empleos-search-input"
            type="text"
            name={idText}
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleTextChange}
          />
        </div>

        <div className="search-filters">
          <select
            name={idTechnology}
            id="filter-technology"
            onChange={handleTextChange}
          >
            <option value="">Tecnología</option>
            <optgroup label="Tecnologías populares">
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="react">React</option>
              <option value="nodejs">Node.js</option>
            </optgroup>
            <option value="java">Java</option>
            <hr />
            <option value="csharp">C#</option>
            <option value="c">C</option>
            <option value="c++">C++</option>
            <hr />
            <option value="ruby">Ruby</option>
            <option value="php">PHP</option>
          </select>

          <select
            name={idLocation}
            id="filter-location"
            onChange={handleTextChange}
          >
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select
            name={idExperience}
            id="filter-experience-level"
            onChange={handleTextChange}
          >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>
        </div> 
      </form>

      <span id="filter-selected-value"></span>
    </section>
  );
};

export default SearchFormSection;
