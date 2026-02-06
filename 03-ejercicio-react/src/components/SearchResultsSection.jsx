const SearchResultsSection = () => {
    return (
                <section>
          <h2 style={{ textAlign: "center" }}>Resultados de búsqueda</h2>

          <div className="jobs-listings">
            <article
              className="job-listing-card"
              data-modalidad="remoto"
              data-nivel="senior"
              data-technology="javascript"
            >
              <div>
                <h3>Desarrollador de Software Senior</h3>
                <small>Tech Solutions Inc. | Remoto</small>
                <p>
                  Buscamos un ingeniero de software con experiencia en
                  desarrollo web y conocimientos en JavaScript, React y Node.js.
                  El candidato ideal debe ser capaz de trabajar en equipo y
                  tener buenas habilidades de comunicación.
                </p>
              </div>
              <button className="button-apply-job">Aplicar</button>
            </article>
          </div>
        </section>
    )
}

export default SearchResultsSection;
