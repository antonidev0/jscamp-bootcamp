/* Aquí va la lógica para filtrar los resultados de búsqueda */

// Selecciono el input
const searchInput = document.querySelector("#empleos-search-input");
// Selecciono el contenedor de los tranajos, el elemento ul
const container = document.querySelector(".jobs-listings");

// selecciono el filtro de lacacion del elemento slect
const filter = document.querySelector("#filter-location");
// seleeciono el filtro por tecnologia
const filterTech = document.querySelector("#filter-technology");
// selecciono filtro por nivel de experiencia
const filterExp = document.querySelector("#filter-experience-level");

// (1) Evento para filtrar con el input

// funcion para no diferenciar entre acentos o tildes
const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

// evento para el input
searchInput.addEventListener("input", () => {
  // obtengo el texto ingresado, se pasa a minuscula y se eliminan espacios extra
  const searchTerm = removeAccents(searchInput.value.toLowerCase().trim());

  console.log(searchTerm, "aaaaaaaaaa");

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

// (2) evento para filtrar por tecnologia
filterTech.addEventListener("change", function () {
  // selecciono todas las tarjetas de trabajo
  const jobs = document.querySelectorAll(".job-listing-card");

  // obtengo el valor seleccionado
  const selectedValue = filterTech.value;

  // recorro todas las tarjetas de trabajo
  jobs.forEach((job) => {
    // obtengo la experiencia de la tarjeta
    const tech = job.getAttribute("data-technology");

    // si no hay filtro seleccionado muestro todas las tarjetas
    // si hay filtro seleccionado muestro solo las que coinciden
    const isShown = selectedValue === "" || selectedValue === tech;

    // y muestro la tarjeta segun corresponda
    job.classList.toggle("is-hidden", isShown === false);
  });
});

// (3) escucho el evento change sobre el select
filter.addEventListener("change", function () {
  // selecciono todas las tarjetas de trabajo
  const jobs = document.querySelectorAll(".job-listing-card");

  // obtengo el valor seleccionado
  const selectedValue = filter.value;

  // recorro todas las tarjetas de trabajo
  jobs.forEach((job) => {
    // obtengo la modalidad de la tarjeta
    const modalidad = job.getAttribute("data-modalidad");

    // si no hay filtro seleccionado muestro todas las tarjetas
    // si hay filtro seleccionado muestro solo las que coinciden
    const isShown = selectedValue === "" || selectedValue === modalidad;

    // y muestro la tarjeta segun corresponda
    job.classList.toggle("is-hidden", isShown === false);
  });
});

// (4) evento para filtrar por experiencia
filterExp.addEventListener("change", function () {
  // selecciono todas las tarjetas de trabajo
  const jobs = document.querySelectorAll(".job-listing-card");

  // obtengo el valor seleccionado
  const selectedValue = filterExp.value;

  // recorro todas las tarjetas de trabajo
  jobs.forEach((job) => {
    // obtengo la experiencia de la tarjeta
    const exp = job.getAttribute("data-nivel");

    // si no hay filtro seleccionado muestro todas las tarjetas
    // si hay filtro seleccionado muestro solo las que coinciden
    const isShown = selectedValue === "" || selectedValue === exp;

    // y muestro la tarjeta segun corresponda
    job.classList.toggle("is-hidden", isShown === false);
  });
});
