import { createServer } from "node:http";

const DESIRED_PORT = process.env.PORT ?? 3000;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  res.end("¡Hola Mundo! 🚀 Aquí tienes un servidor con tildes.");
});

server.listen(DESIRED_PORT, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${DESIRED_PORT}`,
  );
});