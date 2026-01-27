// const boton = document.querySelectorAll(".btn-apply");

// const enviar = () => {

//   console.log("lllllllll");
  
// };

// boton.forEach(botones => {
//   botones.addEventListener('click', function () {
//    console.log("hola");
   
//   })
// });

const filter = document.querySelector('#filter-location');
const mensaje = document.querySelector("#filter-selected-value");
const jobs = document.querySelectorAll(".job-content");
  
filter.addEventListener('change', function () {
  const selectedValue = filter.value;

  if (selectedValue) {
    mensaje.textContent = `filtrado por ${selectedValue}`
  } else {
    mensaje.textContent = '';
  };

  jobs.forEach(job => {
    const modalidad = job.dataset.modalidad; 
    const isShow = selectedValue === "" || selectedValue === modalidad;
    job.classList.toggle('is-hidden', !isShow);
    
  })
})
