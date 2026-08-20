/* Aquí irá tu código del segundo ejercicio */
// importo ramdomUUID para generar ids aleatorios
import { randomUUID } from "crypto";
// importo la base de datos
import { db } from "./database";

// importo el archivo jobs.json para poblar la base de datos
import jobs from "../jobs.json" with { type: "json" };

// oye preparame esta sentencia SQL para crear la tabla jobs
db.exec(`
    CREATE TABLE IF NOT EXISTS jobs (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        company TEXT NOT NULL,
        location TEXT NOT NULL,
        description TEXT NOT NULL,
        modality TEXT NOT NULL CHECK (modality IN ('remote', 'onsite', 'hybrid')),
        level TEXT NOT NULL CHECK (level IN ('junior', 'mid', 'senior'))
    );

    CREATE TABLE IF NOT EXISTS job_technologies (
        job_id TEXT NOT NULL,
        technology TEXT NOT NULL, 
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS job_content (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        description TEXT NOT NULL,
        responsibilities TEXT NOT NULL,
        requirements TEXT NOT NULL,
        about TEXT NOT NULL,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    );
    `);
const insertJob = db.prepare(`
    INSERT INTO jobs (id, title, company, location, description, modality, level)
    VALUES (?, ?, ?, ?, ?, ?, ?)
`);

const insertJobTechnology = db.prepare(`
    INSERT INTO job_technologies (job_id, technology)
    VALUES (?, ?)
`);

const insertJobContent = db.prepare(`
    INSERT INTO job_content (id, job_id, description, responsibilities, requirements, about)
    VALUES (?, ?, ?, ?, ?, ?)
`);

// Prepara esta operacion que va a recibir como parametros,
//  una lista llamada jobList que su tipo debe ser igual a jobs

const seedDatabase = db.transaction((jobList: typeof jobs) => {
  // Con esto vaciamos las tablas antes de insertar para que el seed sea repetible (ejecutarlo dos o más veces)
  db.exec(
    `DELETE FROM job_content; DELETE FROM job_technologies; DELETE FROM jobs;`,
  );

  for (const job of jobList) {
    insertJob.run(
      job.id,
      job.title,
      job.company,
      job.location,
      job.description,
      job.modality,
      job.level,
    );

    for (const technology of job.technologies) {
      insertJobTechnology.run(job.id, technology);
    }

    if (job.content) {
      insertJobContent.run(
        randomUUID(),
        job.id,
        job.content.description,
        job.content.responsibilities,
        job.content.requirements,
        job.content.about,
      );
    }
  }
});

seedDatabase(jobs);

console.log(`esta listo papa con, ${jobs.length} chambas`);
