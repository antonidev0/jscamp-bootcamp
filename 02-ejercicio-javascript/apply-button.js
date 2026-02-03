/* Aquí va la lógica para dar funcionalidad al botón de "Aplicar" */

// Se selecciona el boton para aplicar
const jobListingSection = document.querySelector('.jobs-listings');

// escucho cualquier click que ocurra 
jobListingSection.addEventListener('click', function
    (event) {
    
    // obtengo el elemento button que fue clickeado
    console.log(event)

    const element = event.target

    // verifico que tenga la clase 
    if (element.classList.contains('button-apply-job')) {
        // cambio el texto
        element.textContent = '¡Aplicado!'
        // le agrego la clase is applied
        element.classList.add('is-applied')
        // desbilito el boton 
        element.disabled = true
    }
})
    