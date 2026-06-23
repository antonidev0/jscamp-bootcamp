import { Router } from "express";
import { JobsControllers } from "../controllers/jobs.js";

const jobsRouter = Router()

jobsRouter.get("/", JobsControllers.getAll);
jobsRouter.get("/:id", JobsControllers.getId);
jobsRouter.post("/", JobsControllers.create);
jobsRouter.put("/:id", JobsControllers.update);
jobsRouter.patch("/:id", JobsControllers.partialUpdate);
jobsRouter.delete("/:id", JobsControllers.delete);

export { jobsRouter };