export class JobsControllers {
  static async getAll(req, res) {
    const {
      text,
      titulo,
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

    return res.json({
      data: paginatedJobs,
      total: filteredJobs.length,
      limit: limiNumber,
      offset: offsetNumber,
    });
  }

  static async getId(req, res) {
    const { id } = req.params;
    const job = jobs.find((job) => job.id === id);

    if (!job) return res.status(404).json({ message: "Empleo no encontrado" });
    return res.json(job);
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, data } = req.body;

    const newJob = {
      id: crypto.randomUUID(),
      titulo,
      empresa,
      ubicacion,
      data,
    };

    jobs.push(newJob);

    return res.status(201).json(newJob);
  }

  static async update(req, res) {
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
  }

  static async partialUpdate(req, res) {
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
  }
    
  static async delete(req, res) {
      
    const { id } = req.params;
    const index = jobs.findIndex((job) => job.id === id);
    if (index === -1) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    // borro 1 elemento en esa posicion
    jobs.splice(index, 1);
    return res.status(200).json({ message: "Job deleted" });
      
  }
    
}
