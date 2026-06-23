import { JobModel } from "../models/job.js";

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

    const paginatedJobs = await JobModel.getAll({
      text,
      titulo,
      level,
      limit,
      technology,
      offset,
    });

    return res.json({
      data: paginatedJobs,
      total: filteredJobs.length,
      limit: limitNumber,
      offset: offsetNumber,
    });
  }

  static async getId(req, res) {
    const { id } = req.params;
    const job = await JobModel.getId(Id);

    if (!job) return res.status(404).json({ message: "Empleo no encontrado" });
    return res.json(job);
  }

  static async create(req, res) {
    const { titulo, empresa, ubicacion, data } = req.body;

    const newJob = await JobModel.create({ titulo, empresa, ubicacion, data });

    return res.status(201).json(newJob);
  }

  static async update(req, res) {
    // reemplazar un job

    // saco el id de la URL
    const { id } = req.params;

    if (index === -1) {
      // si busco el inidice (el trabajo) y no exite
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    // saco los campos del body
    const { titulo, empresa, ubicacion, data } = req.body;

    const updatedJob = await JobModel.update({
      id,
      titulo,
      empresa,
      ubicacion,
      data,
    });

    return res.status(200).json(updatedJob);
  }

  static async partialUpdate(req, res) {
    // actualizar un job

    const { id } = req.params;

    // campos que llegaron al body
    const campos = req.body;

    const updatedJob = await JobModel.partialUpdate({ id, campos });

    if (!updatedJob) {
      // si no existe
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    return res.status(200).json(updatedJob);
  }

  static async delete(req, res) {
    const { id } = req.params;

    const index = await JobModel.delete(id);

    if (index === -1) return res.status(404).json({ message: "Trabajo no encontrado" });

    return res.status(200).json({ message: "Job deleted" });
  }
}
