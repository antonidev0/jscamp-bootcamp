import express from "express";
import { DEAFAULTS } from "./config.js";
import { corsMiddleware } from "./middlewares/cors.js";

import jobs from "./jobs.json" with { type: "json" };

process.loadEnvFile();
const PORT_SERVER = process.env.PORT ?? 1234;
app.use(express.json())
console.log(PORT_SERVER);

app.listen(PORT_SERVER, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT_SERVER}`);
});
