/* Aquí va la lógica para filtrar los resultados de búsqueda */


// selecciono el filtro de lacacion del elemento slect
const filter = document.querySelector('#filter-location')
// selecciono el mensaje de texto donde se muestra el valor seleccionado
const mensaje = document.querySelector('#filter-selected-value')

// escucho el evento change sobre el select
filter.addEventListener('change', function () {
    
    // selecciono todas las tarjetas de trabajo
    const jobs = document.querySelectorAll(".job-listing-card"); 
    

    // obtengo el valor seleccionado
    const selectedValue = filter.value

    // si hay un valor seleccionado, muestro el mensaje
    if (selectedValue) {
        mensaje.textContent = `Has seleccionado ${selectedValue}`
    } else {
        // si no hay valor seleccionado, limpio el mensaje
        mensaje.textContent = ''
    }

    // recorro todas las tarjetas de trabajo
    jobs.forEach(job => { 
        
        // obtengo la modalidad de la tarjeta 
        const modalidad = job.getAttribute("data-modalidad");
        
        // si no hay filtro seleccionado muestro todas las tarjetas
        // si hay filtro seleccionado muestro solo las que coinciden
        const isShown = selectedValue === '' || selectedValue === modalidad

        // y muestro la tarjeta segun corresponda
        job.classList.toggle('is-hidden', isShown === false)
    })
})
