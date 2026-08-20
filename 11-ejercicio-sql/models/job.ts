import crypto from "node:crypto";
import type { Job, CreateJobDTO, UpdateJobDTO, JobFilters } from "../types";
// importo la base de datos
import { db } from "../db/database"; 

// consultas
// consulta para obtener todos los jobs segun el id
const selectJobById = db.prepare(`SELECT * FROM jobs WHERE id = ?`);

// consulta para obtener todos los id de los jobs
const selectTechnologies = db.prepare(
  `SELECT technology FROM job_technologies WHERE job_id = ?`,
);

// consusulta para obtener el contenido de un job segun el id
const selectContent = db.prepare(`SELECT * FROM job_content WHERE job_id = ?`);

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
  INSERT INTO job_content (id, job_id, description, responsibilities, requirements, about)
  VALUES (?, ?, ?, ?, ?, ?)
`);

const deleteJob = db.prepare(`DELETE FROM jobs WHERE id = ?`);

// reconstruye un objeto Job a partir de los datos de la base de datos
// recibe las filas del trabajo job y los junta con las tecnologias y el contenido del trabajo

function buildJob(jobRow: any): Job {
  // busco en la tabla de tecnologias del job las fila de este por su id
  // un job puede tener varias tecnologias, por eso el .all()

  // hazme esta consulata con este id y traeme todas las filas que pertenezcan a este job
  // cada fila en la tabla  de tecnologias sera un objeto de tipo string
  const techRows = selectTechnologies.all(jobRow.id) as {
    technology: string;
  }[];

  // de cada fila de tecnologias, obtenme el valor de la columna technology
  //  y guardamelo en un arreglo de strings
  const technologies = techRows.map((row) => row.technology);

  // busca el contenido del job en la tabla de contenido del job por su id
  // que puede ser undefined si no tiene contenido
  const contentRow = selectContent.get(jobRow.id) as any;

  // armo y devuelvo el objeto Job con los datos de la base de datos, las tecnologias y el contenido
  return {
    id: jobRow.id,
    title: jobRow.title,
    company: jobRow.company,
    location: jobRow.location,
    description: jobRow.description,
    data: {
      technology: technologies,
      modality: jobRow.modality,
      level: jobRow.level,
    },
    content: contentRow
      ? {
          description: contentRow.description,
          responsibilities: contentRow.responsibilities,
          requirements: contentRow.requirements,
          about: contentRow.about,
        }
      : undefined,
  };
}

// funcion para insertar un job en la base de datos,
//  que recibe un objeto Job y lo inserta en las tres tablas de la base de datos
// utilizo void porque no me va a retornar nada
function insertJobInDatabase(job: Job): void {
  insertJob.run(
    job.id,
    job.title,
    job.company,
    job.location,
    job.description,
    job.data.modality,
    job.data.level,
  );

  for (const tech of job.data.technology) {
    insertTechnology.run(job.id, tech);
  }

  if (job.content) {
    insertContent.run(
      crypto.randomUUID(),
      job.id,
      job.content.description,
      job.content.responsibilities,
      job.content.requirements,
      job.content.about,
    );
  }
}

export class JobModel {
  // Obtener todos los jobs con filtros opcionales

  // La función getAll recibe un argumento opcional llamado filters
  // (que puede ser de tipo JobFilters o no pasarse nada). Al terminar,
  // devuelve una Promesa que se resuelve en un arreglo/lista de trabajos (Job[]

  static async getAll(filters?: JobFilters & { limit?: number; offset?: number; }): Promise<Job[]> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener todos los resultados, y por cada filtro,
    // debemos agregarlo a la consulta

    // creo una variale sql que contenga la consulta para obtener todos los jobs de la base de datos
    let sql = `SELECT * FROM jobs`;
    // condicion de where
    const conditions: string[] = [];
    // valores de los filtros
    const params: any[] = [];
 
    // filtro por tecnologia
    if (filters?.technology) { 
      // traeme la tabla de tecnologias y juntala con la tabla de jobs
      // y juntalos solo cuanod el id de un job sea igual al id del job de la tabla de tecnologias
      sql += ` INNER JOIN job_technologies ON jobs.id = job_technologies.job_id`;
    
      // la columna technology de la tabla job_technologies debe ser igual al valor del filtro tech
      conditions.push(`job_technologies.technology = ?`);
      params.push(filters.technology);
    }

    if (filters?.modality) {
      conditions.push(`jobs.modality = ?`);
      params.push(filters.modality);
    }

    if (filters?.level) {
      conditions.push(`jobs.level = ?`);
      params.push(filters.level);
    }

    // si hay condiciones, agregalas a la consulta
    if (conditions.length > 0) {
      sql += ` WHERE ` + conditions.join(` AND `);
    }

    // paginacion
    if (filters?.limit !== undefined) {
      sql += ` LIMIT ?`;
      params.push(filters.limit);

      if (filters?.offset !== undefined) {
        sql += ` OFFSET ?`;
        params.push(filters.offset);
      }
    }

    const jobRows = db.prepare(sql).all(...params);
    return jobRows.map((row) => buildJob(row));
  }


  // Obtener un job por ID
  static async getById(id: string): Promise<Job | undefined> {
    // TODO: Debemos hacer la consulta a la base de datos para obtener el job por ID
    const jobRow = selectJobById.get(id);
    if (!jobRow) {
      return undefined;
    }
    return buildJob(jobRow);
  }

  // Crear un nuevo job
  static async create(input: CreateJobDTO): Promise<Job> {
    const newJob: Job = {
      id: crypto.randomUUID(),
      ...input,
    };

    // haz esta funcion que al ejecutarse envuelve la insercion del
    // job en la base de datos en una transaccion
    const doCreate = db.transaction(() => {
      insertJobInDatabase(newJob);
    });

    // TODO: Debemos insertar el job en la base de datos
    doCreate();
    return newJob;
  }

  // Eliminar un job
  static async delete(id: string): Promise<boolean> {
    // TODO: Debemos eliminar el job de la base de dato
    const result = deleteJob.run(id);
    return result.changes > 0;
  }

  // Actualizar un job
  static async update(id: string, input: UpdateJobDTO): Promise<Job | null> {
    // TODO: Debemos actualizar el job en la base de datos

    // si no existe el job con ese id, devuelve null
    const existingJob = await JobModel.getById(id);
    if (!existingJob) return null;

    const updatedJob: Job = {
      ...existingJob,
      ...input,
      id,
      data: {
        ...existingJob.data,
        ...(input.data ?? {}),
      },
    };

    const doUpdate = db.transaction(() => {
      deleteJob.run(id); //elimino el job existente
      insertJobInDatabase(updatedJob); // inserto el job actualizado
    });

    doUpdate();
    return updatedJob;
  }

}
