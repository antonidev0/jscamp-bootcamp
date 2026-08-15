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
    )

    CREATE TABLE IF NOT EXISTS job_technologies (
        job_id TEXT NOT NULL,
        technology TEXT NOT NULL, 
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    )

    CREATE TABLE IF NOT EXISTS jobs_content (
        id TEXT PRIMARY KEY,
        job_id TEXT NOT NULL,
        description TEXT NOT NULL,
        responsibilities TEXT NOT NULL,
        requirements TEXT NOT NULL,
        about TEXT NOT NULL,
        FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    )
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
    INSERT INTO jobs_content (id, job_id, description, responsibilities, requirements, about)
    VALUES (?, ?, ?, ?, ?, ?)
`);

