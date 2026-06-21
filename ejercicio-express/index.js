import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEAFAULTS } from "./config.js";

process.loadEnvFile();
const PORT_SERVER = process.env.PORT ?? 1234;
console.log(PORT_SERVER);

const app = express();

app.use(express.json())


app.get("/", (request, response) => {
  return response.send("<h1>Hola mundo desde Express</h1>.");
});

app.get("/health", (request, response) => {
  return response.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.get("/jobs", (req, res) => {
  const {
    text,
    title,
    level,
    limit = DEAFAULTS.LIMIT_PAGINATION,
    technology,
    offset = DEAFAULTS.LIMIT_OFFSET,
  } = req.query;

  let filteredJobs = jobs;

  if (text) {
    const searchTerm = text.toLowerCase();
    filteredJobs = filteredJobs.filter(
      (job) =>
        job.titulo.toLocaleLowerCase().includes(searchTerm) ||
        job.descripcion.toLocaleLowerCase().includes(searchTerm),
    );
  }

  const limiNumber = Number(limit);
  const offsetNumber = Number(offset);

  const paginatedJobs = filteredJobs.slice(
    offsetNumber,
    offsetNumber + limiNumber,
  );

  return res.json(paginatedJobs);
});

app.get("/jobs/:id", (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) return res.status(404).json({ message: "Empleo no encontrado" });
  return res.json(job);
});

// NO ES idenpotente
app.post("/jobs", (req, res) => {
  // Crear un job 
   const { titulo, empresa, ubicacion, data } = req.body;

   const newJob = {
     id: crypto.randomUUID(),
     titulo,
     empresa,
     ubicacion,
     data,
   };

   jobs.push(newJob);

   // Respondemos con 201 Created 
   return res.status(201).json(newJob);
});

app.put("/jobs/:id", (req, res) => {
  // reemplazar un job

  // saco el id de la URL
  const { id } = req.params;

  // busco la posicion del trabajo en el array
  const index = jobs.findIndex((job) => job.id === id);

  if (index === -1) {
    // si busco el inidice (el trabajo) y no exite
    return res.status(404).json({ message: "Trabajo no encontrado" });
  }

  // saco los campos del body
  const { titulo, empresa, ubicacion, data } = req.body;

  // armo el objeto nuevo (mantengo el mismo id)
  const updatedJob = { id, titulo, empresa, ubicacion, data };

  // reemplazo el viejo por el nuevo
  jobs[index] = updatedJob;

  return res.status(200).json(updatedJob);
});

app.patch("/jobs/:id", (req, res) => {
  // actualizar un job

  const { id } = req.params;

  // busco la posicion del trabajo en el array
  const index = jobs.findIndex((job) => job.id === id);

  if (index === -1) {
    // si no existe
    return res.status(404).json({ message: "Trabajo no encontrado" });
  }

  // jobs[index] accede a los inidices de los trabajos
  // ...jobs[index] copia la lista vieja
  // , ...req.body y actualiza por esta que te envio, deja el id como esta
  jobs[index] = { ...jobs[index], ...req.body, id }; 

  return res.status(200).json(jobs[index]);
}); 

app.delete("/jobs/:id", (req, res) => {
  // Eliminar un job
});

app.listen(PORT_SERVER, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT_SERVER}`);
});
