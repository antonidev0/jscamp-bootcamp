import jobs from "../jobs.json" with { type: "json" };

export class JobModel {
  static async getAll({
    text,
    location,
    experience,
    limit = 10,
    technology,
    offset = 0,
  }) {
    let filteredJobs = jobs;

    if (text) {
      const searchTerm = text.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) =>
          // si esta vacio agrega un string vacio, asi no sera undefined
          (job.titulo ?? "").toLocaleLowerCase().includes(searchTerm) ||
          (job.descripcion ?? "").toLocaleLowerCase().includes(searchTerm),
      );
    }

    // filtro por ubicacion
    if (location) {
      // los transforo en inuscula
      const loc = location.toLowerCase();
      // los trabajos filtrados son los job.ubicaion si me das null o undefined dame un string vacio
      // y lo que me des sera en minuscula, y daelo si en loc incluye la palabra que busco
      filteredJobs = filteredJobs.filter((job) =>
        (job.ubicacion ?? "").toLowerCase().includes(loc),
      );
    }

    // filtro por experiencia (data.nivel)
    if (experience) {
      // misma logica que en location
      const exp = experience.toLowerCase();
      filteredJobs = filteredJobs.filter(
        (job) => (job.data?.nivel ?? "").toLowerCase() === exp,
      );
    }

    // filtro por tecnología (array data.technology)
    if (technology) {
      // transforo en minuscula
      const tech = technology.toLowerCase();
      filteredJobs = filteredJobs.filter((job) => {
        // ve a job. Si data existe, entra y busca technology. Pero si data no existe
        // (es null o undefined), no te rompas, detente ahí y devuelve undefined.
        // Si obtuve null o undefined dame un array vacio
        const techs = job.data?.technology ?? [];

        // Dime si es verdad (true) o es mentira (false) que dentro de
        // este array hay alguna tecnologia que, en minusculas, sea igual a tech
        return techs.some((t) => t.toLowerCase() === tech);
      });
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
