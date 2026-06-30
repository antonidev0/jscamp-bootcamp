import jobs from "../jobs.json" with { type: "json" };

export class JobModel {
  static async getAll({
    text,
    title,
    level,
    limit = 10,
    technology,
    offset = 0,
  }) {
    let filteredJobs = jobs;

    if (text) {
      const searchTerm = text.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.titulo.toLocaleLowerCase().includes(searchTerm) ||
          job.descripcion.toLocaleLowerCase().includes(searchTerm),
      );
    }

    const total = filteredJobs.length;
    const limitNumber = Number(limit);
    const offsetNumber = Number(offset);

     // valido que limit y offset sean numeros validos y no negativos
    const isInvalidNumber = (number) => number < 0 || Number.isNaN(number);

      if (isInvalidNumber(limitNumber) || isInvalidNumber(offsetNumber)) {
        // lanzo un error (el model no me dice de el status HTTP, eso es del controller)
        throw new Error("limit y offset deben ser numeros positivos");
      }

    const paginatedJobs = filteredJobs.slice(
      offsetNumber,
      offsetNumber + limitNumber,
    );

      return {
        data: paginatedJobs,
        total,
        limit: limitNumber,
        offset: offsetNumber,
      };
  }

  static async create({ titulo, empresa, ubicacion, data }) {
    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      data,
    };
    jobs.push(newJob);

    return newJob;
  }

  static async getId({ id }) { 
    const job = jobs.find((job) => job.id === id);
    return job;
  }

  static async update({ id, titulo, empresa, ubicacion, data }) {
    // armo el objeto nuevo (mantengo el mismo id)
    // busco la posicion del trabajo en el array
    const index = jobs.findIndex((job) => job.id === id);

    if (index === -1) {
      return null;
    }

    const updatedJob = { id, titulo, empresa, ubicacion, data };

    // reemplazo el viejo por el nuevo
    jobs[index] = updatedJob;

    return updatedJob;
  }

  static async partialUpdate({ id, campos }) {
    // busco la posicion del trabajo en el array
    const index = jobs.findIndex((job) => job.id === id);

    if (index === -1) {
      return null;
    }

    // jobs[index] accede a los inidices de los trabajos
    // ...jobs[index] copia la lista vieja
    // , ...req.body y actualiza por esta que te envio, deja el id como esta

    jobs[index] = { ...jobs[index], ...campos, id };

    return jobs[index];
  }

  static async delete({ id }) { 
    const index = jobs.findIndex((job) => job.id === id);

    if (index === -1) {
      return null;
    }

    const [deletedJob] = jobs.splice(index, 1);

    //   regreso el trabajo eliminado,
    //   como un existia, pero ya lo elimine
    return deletedJob;
  }
}
