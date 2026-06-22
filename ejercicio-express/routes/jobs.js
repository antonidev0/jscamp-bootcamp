import { Router } from "express";
import { JobsControllers } from "../controllers/jobs";

const jobsRouter = Router()

jobsRouter.get("/", JobsControllers.getAll());

jobsRouter.get("/:id", JobsControllers.getId());

// NO ES idenpotente
jobsRouter.post("/", JobsControllers.create());

jobsRouter.put("/:id", JobsControllers.update());

jobsRouter.patch("/:id", JobsControllers.partialUpdate());

jobsRouter.delete("/:id", JobsControllers.delete());