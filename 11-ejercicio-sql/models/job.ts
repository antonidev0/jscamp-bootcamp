import crypto from 'node:crypto'
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from '../types'
// importo la base de datos
import { db } from '../db/database'


// consultas 
// consulta para obtener todos los jobs segun el id
const selectJobById = db.prepare(`SELECT * FROM jobs WHERE id = ?`);

// consulta para obtener todos los id de los jobs
const selectTechnologies = db.prepare(
  `SELECT technology FROM job_technologies WHERE job_id = ?`,
);

// consusulta para obtener el contenido de un job segun el id
const selectContent = db.prepare(`SELECT * FROM jobs_content WHERE job_id = ?`);

// consultas para insertar datos en la base de datos
const insertJob = db.prepare(`
  INSERT INTO jobs (id, title, company, location, description, modality, level)
  VALUES (?, ?, ?, ?, ?, ?, ?)
`);

// consulta para insertar tecnologias de un job
const insertTechnology = db.prepare(
  `INSERT INTO job_technologies (job_id, technology) VALUES (?, ?)`,
);

// consulta para insertar contenido de un job
const insertContent = db.prepare(`
  INSERT INTO jobs_content (id, job_id, description, responsibilities, requirements, about)
  VALUES (?, ?, ?, ?, ?, ?)
`);

export class JobModel {
  // Obtener todos los jobs con filtros opcionales

  // La función getAll recibe un argumento opcional llamado filters
  // (que puede ser de tipo JobFilters o no pasarse nada). Al terminar, 
  // devuelve una Promesa que se resuelve en un arreglo/lista de trabajos (Job[]
    
  static async getAll(filters?: JobFilters): Promise<Job[]> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener todos los resultados, y por cada filtro,
    // debemos agregarlo a la consulta
    const jobRows = db.prepare(` SELECT * FROM jobs`).all()
    return jobRows.map((row) => buldJob(row));
  }

  // Obtener un job por ID
  static async getById(id: string): Promise<Job | undefined> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener el job por ID
    return undefined
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    }

    // TODO: Debemos insertar el job en la base de datos
    return newJob
  }

  // Eliminar un job
  static async delete(id: string): Promise<boolean> {
    // TODO: Debemos eliminar el job de la base de datos
    return false
  }

  // Actualizar un job
  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    // TODO: Debemos actualizar el job en la base de datos
    return null
  }
}
