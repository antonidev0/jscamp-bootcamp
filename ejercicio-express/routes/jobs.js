import { Router } from "express";
import { JobsControllers } from "../controllers/jobs.js";
import { validateJobMiddleware, validatePartialJobMiddleware } from "../middlewares/validationJob.js";

const jobsRouter = Router()

jobsRouter.get("/", JobsControllers.getAll);
jobsRouter.get("/:id", JobsControllers.getId);

// agrego el middleware
jobsRouter.post("/", validateJobMiddleware, JobsControllers.create);
jobsRouter.put("/:id", validateJobMiddleware, JobsControllers.update);
jobsRouter.patch("/:id", JobsControllers.partialUpdate);

jobsRouter.delete("/:id", JobsControllers.delete);

export { jobsRouter };