import jobs from '../data/jobs.json' with { type: 'json' }

export class JobModel {
    static async getAll({ text, title, level, limit = 10, technology, offset = 0 }) {
        let filteredJobs = jobs;

        if (text) {
          const searchTerm = text.toLowerCase();
          filteredJobs = filteredJobs.filter(
            (job) =>
              job.titulo.toLocaleLowerCase().includes(searchTerm) ||
              job.descripcion.toLocaleLowerCase().includes(searchTerm),
          );
        }

        const limitNumber = Number(limit);
        const offsetNumber = Number(offset);

        const paginatedJobs = filteredJobs.slice(
          offsetNumber,
          offsetNumber + limitNumber,
        );

    }

    static async create({ titulo, empresa, ubicacion, data }) {
        const newJob = {
            id: crypto.randomUUID(),
            titulo,
            empresa,
            ubicacion,
            data
        }
        job.push(newJob);
        
        return newJob
    }
}
