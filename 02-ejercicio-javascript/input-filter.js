/* Lógica de filtrado por nombre del input de búsqueda */
const searchInput = document.querySelector("#empleos-search-input");
const container = document.querySelector(".jobs-listings");

searchInput.addEventListener("input", () => {
  // obtengo el texto ingresado, se pasa a minuscula y se eliminan espacios extra
  const searchTerm = searchInput.value.toLowerCase().trim();
 
  // Se seleccionan todas las tarjetas de empleos
  const jobCards = container.querySelectorAll(".job-listing-card");
 
  // se recorre cada tarjeta para evaluar si coincide con la busqueda
  jobCards.forEach((card) => {
    // Se obtiene el texto del titulo del empleo
    const title = card.querySelector("h3").textContent.toLowerCase();
      
    // Se obtiene el nombre de la empresa
    const company = card.querySelector("small").textContent.toLowerCase();

    // se obtiene la descripcion del empleo
    const description = card.querySelector("p").textContent.toLowerCase();

    // se verifica si el termino de busqueda coincide con el titulo, la empresa o la descripcion
    const matches =
      title.includes(searchTerm) ||
      company.includes(searchTerm) ||
      description.includes(searchTerm);

    // si hay coincidencia se muestra la tarjeta,
    // si no, se oculta
    card.style.display = matches ? "" : "none";
  });
});
