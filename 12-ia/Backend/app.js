import express from "express";
import { DEAFAULTS } from "./config.js";
import { logMiddleware, corsMiddleware } from "./middlewares/cors.js";
import { jobsRouter } from "./routes/jobs.js";

import jobs from "./jobs.json" with { type: "json" };
import { aiRouter } from "./routes/ia.js";

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  process.loadEnvFile();
}


const PORT_SERVER = process.env.PORT ?? 1234;

const app = express();
 
app.use(corsMiddleware());
app.use(express.json());
app.use("/jobs", jobsRouter);
app.use('/ai', aiRouter);

console.log(PORT_SERVER);

if (!isProduction) {
  app.listen(PORT_SERVER, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT_SERVER}`);
  });
}

export default app;
