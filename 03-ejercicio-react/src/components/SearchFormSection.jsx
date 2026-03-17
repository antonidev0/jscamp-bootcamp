import React from "react";
import { useSearchForm } from "../hooks/useSearchForm.jsx";


const SearchFormSection = (initialText) => {

  const {
    filters,
    textToFilter,
    hasActiveFilters,
    clearFilters,
    handleTextChange,
    handleTechnologyChange,
    handleLocationChange,
    handleExperienceChange,
  } = useSearchForm();


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
            value={textToFilter}
            placeholder="Buscar trabajos, empresas o habilidades"
            onChange={handleTextChange}
            defaultValue={initialText}
          />
        </div>

        <div className="search-filters">
          <select
            id="filter-technology"
            value={filters.technology}
            onChange={handleTechnologyChange}
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
            id="filter-location"
            value={filters.location}
            onChange={handleLocationChange}
          >
            <option value="">Ubicación</option>
            <option value="remoto">Remoto</option>
            <option value="cdmx">Ciudad de México</option>
            <option value="guadalajara">Guadalajara</option>
            <option value="monterrey">Monterrey</option>
            <option value="barcelona">Barcelona</option>
          </select>

          <select
            id="filter-experience-level"
            value={filters.experience}
            onChange={handleExperienceChange}
          >
            <option value="">Nivel de experiencia</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
          </select>

      {hasActiveFilters && (
        <button type="button" className="btn-clear" onClick={clearFilters}>
          Limpiar filtros
        </button>
        )}

        </div>

        
      </form>


      <span id="filter-selected-value"></span>
    </section>
  );
};

export default SearchFormSection;
