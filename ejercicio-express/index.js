import express from "express";
import jobs from './jobs.json' with { type: 'json' }
import { DEAFAULTS } from "./config.js";

process.loadEnvFile();
const PORT_SERVER = process.env.PORT ?? 1234
console.log(PORT_SERVER);

const app = express();

app.get("/", (request, response) => {
  return response.send("<h1>Hola mundo desde Express</h1>.");
});

app.get("/health", (request, response) => {
  return response.json({
    status: "ok",
    uptime: process.uptime(),
  });
});

app.get('/get-jobs', (req, res) => {

  const { text, title, level, limit = DEAFAULTS.LIMIT_PAGINATION, technology, offset=DEAFAULTS.LIMIT_OFFSET } = req.query
  
  let filteredJobs = jobs

  if (text) {
    const searchTerm = text.toLowerCase()
    filteredJobs = filteredJobs.filter(job =>
        job.titulo.toLocaleLowerCase().includes(searchTerm) ||
        job.descripcion.toLocaleLowerCase().includes(searchTerm),
    );
  }
  
  const limiNumber = Number(limit);
  const offsetNumber = Number(offset);

   const paginatedJobs = filteredJobs.slice(offsetNumber, offsetNumber + limiNumber);

  return res.json(paginatedJobs)
})
 
app.get('/get-single-job/:id', (req, res) => {
  const { id } = req.params

  return res.json({
    job: { id, title: `Job with is ${id}` }
  })
}) 
 
  
app.listen(PORT_SERVER, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT_SERVER}`);
});
