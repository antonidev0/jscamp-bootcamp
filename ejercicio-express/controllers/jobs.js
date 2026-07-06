import { JobModel } from "../models/job.js";
import { DEAFAULTS } from "../config.js";

export class JobsControllers {
  static async getAll(req, res) {
    try {
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

    return res.json(paginatedJobs);
    } catch(error) {
       // si el model lanzo el error de validacion -> 400 (Bad Request)
    return res.status(400).json({ message: error.message });
  }
}
  

  static async getId(req, res) {
    const { id } = req.params;
    const job = await JobModel.getId({ id });

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

    // saco los campos del body
    const { titulo, empresa, ubicacion, data } = req.body;

    const updatedJob = await JobModel.update({
      id,
      titulo,
      empresa,
      ubicacion,
      data,
    });

    if (!updatedJob) {
      return res.status(404).json({ message: "Trabajo no encontrado" });
    }

    return res.status(204).send();
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

    return res.status(204).send();
  }

  static async delete(req, res) {
    const { id } = req.params;

    const deleteJob = await JobModel.delete({ id });

    if (!deleteJob)
      return res.status(404).json({ message: "Trabajo no encontrado" });

    // cambio las respuestas a 204 y los.json a .send 
    // ya que 204 no tiene body
    return res.status(204).send();
  }
}
