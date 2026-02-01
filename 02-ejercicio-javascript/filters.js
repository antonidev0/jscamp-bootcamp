/* Aquí va la lógica para filtrar los resultados de búsqueda */

// selecciono el filtro de lacacion del elemento slect
const filter = document.querySelector("#filter-location");
// seleeciono el filtro por tecnologia
const filterTech = document.querySelector("#filter-technology");
// selecciono filtro por nivel de experiencia
const filterExp = document.querySelector("#filter-experience-level");
// selecciono el mensaje de texto donde se muestra el valor seleccionado
const mensaje = document.querySelector("#filter-selected-value");

// escucho el evento change sobre el select
filter.addEventListener("change", function () {
  // selecciono todas las tarjetas de trabajo
  const jobs = document.querySelectorAll(".job-listing-card");

  // obtengo el valor seleccionado
  const selectedValue = filter.value;

  // si hay un valor seleccionado, muestro el mensaje
  if (selectedValue) {
    mensaje.textContent = `Has seleccionado ${selectedValue}`;
  } else {
    // si no hay valor seleccionado, limpio el mensaje
    mensaje.textContent = "";
  }

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

// evento para filtrar por nivel
filterTech.addEventListener("change", function () {
  // selecciono todas las tarjetas de trabajo
  const jobs = document.querySelectorAll(".job-listing-card");

  // obtengo el valor seleccionado
  const selectedValue = filterTech.value;

  // si hay un valor seleccionado, muestro el mensaje
  if (selectedValue) {
    mensaje.textContent = `Has seleccionado ${selectedValue}`;
  } else {
    // si no hay valor seleccionado, limpio el mensaje
    mensaje.textContent = "";
  }

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


// evento para filtrar por experiencia
filterExp.addEventListener("change", function () {
  // selecciono todas las tarjetas de trabajo
  const jobs = document.querySelectorAll(".job-listing-card");

  // obtengo el valor seleccionado
  const selectedValue = filterExp.value;

  // si hay un valor seleccionado, muestro el mensaje
  if (selectedValue) {
    mensaje.textContent = `Has seleccionado ${selectedValue}`;
  } else {
    // si no hay valor seleccionado, limpio el mensaje
    mensaje.textContent = "";
  }

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

