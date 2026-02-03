
const searchInput = document.querySelector("#empleos-search-input");
const filter = document.querySelector("#filter-location");
const filterTech = document.querySelector("#filter-technology");
const filterExp = document.querySelector("#filter-experience-level");

// Una forma distinta de sacar los acentos. Por idioma español, los acentos se representan solo en las vocales. Así que podemos hacer
const removeAccents = (str) => {
  let normalizeStr = str.trim().toLowerCase();
  const listToReplace = ["á", "é", "í", "ó", "ú"];
  const listToReplaceWith = ["a", "e", "i", "o", "u"];

  for (let i = 0; i < listToReplace.length; i++) {
    normalizeStr = normalizeStr.replaceAll(listToReplace[i], listToReplaceWith[i]);
  }
  return normalizeStr;
};

const filterJobs = () => {
  /* 1. obtenemos los filtros que el usuario tiene seleccionados */
  const userSearch = removeAccents(searchInput.value);
  const selectedTech = filterTech.value;
  const selectedLocation = filter.value;
  const selectedExperience = filterExp.value;

  /* 2. obtenemos todos los resultados */
  const jobs = document.querySelectorAll(".job-listing-card");

  /* 3. recorremos todos los resultados y filtramos */
  jobs.forEach((job) => {
    // 4. obtenemos los datos de la tarjeta
    const title = removeAccents(job.querySelector("h3").textContent);
    const company = removeAccents(job.querySelector("small").textContent);
    const description = removeAccents(job.querySelector("p").textContent);

    // 5. obtenemos los los atributos
    const tech = job.getAttribute("data-technology").toLowerCase().split(',');
    const modalidad = job.getAttribute("data-modalidad").toLowerCase();
    const exp = job.getAttribute("data-nivel").toLowerCase();

    // 6. vemos si el filtro coincide con el valor de la tarjeta 
    const isTechMatch = selectedTech === "" || tech.includes(selectedTech);
    const isModalidadMatch = selectedLocation === "" || selectedLocation === modalidad;
    const isExpMatch = selectedExperience === "" || selectedExperience === exp;
    
    const isTextMatch = title.includes(userSearch) || company.includes(userSearch) || description.includes(userSearch);
    
    const isMatch = isTechMatch && isModalidadMatch && isExpMatch && isTextMatch;
    
    // 7. mostramos si coinciden los filtros
    job.classList.toggle("is-hidden", !isMatch);
  })
}

/* Podemos reutilizar la función de filtro y aplicarla al evento que queremos evaluar */
searchInput.addEventListener("input", filterJobs);
filterTech.addEventListener("change", filterJobs);
filter.addEventListener("change", filterJobs);
filterExp.addEventListener("change", filterJobs);