/* Aquí va la lógica para mostrar los resultados de búsqueda */
const container = document.querySelector('.jobs-listings')

// función para obtener los datos de los trabajos
fetch("./data.json")
    .then((respones) => {
        return respones.json();
    })
    .then((jobs) => {
        /* createDocumentFragment() lo que permite es crear una caja virtual en donde se van a poder ir agregando todos los elementos que queremos dibujar en el DOM. Y una vez tengamos todos (cuando termine el bucle for), hacemos el pintado de una sola vez. */
        /* 
        Es un recurso que se suele usar para evitar que se haga el renderizado del DOM en cada iteración del bucle for. En este caso al tener pocos elementos no hay problema, pero te lo quería compartir para que lo conozcas.
        */
        const jobsDocumentFragment = document.createDocumentFragment()
        jobs.forEach(job => {
            const article = document.createElement('article')
            article.className = 'job-listing-card'

            article.dataset.modalidad = job.data.modalidad
            article.dataset.nivel = job.data.nivel
            article.dataset.technology = job.data.technology

            article.innerHTML = `
            <div>
            <h3>${job.titulo}</h3>
            <small>${job.empresa} - ${job.ubicacion} - ${job.data.nivel}</small>
            <p>${job.descripcion}</p>
            </div>
            <button class="button-apply-job">Aplicar</button>`

            jobsDocumentFragment.appendChild(article)
        })
        container.appendChild(jobsDocumentFragment)
    })