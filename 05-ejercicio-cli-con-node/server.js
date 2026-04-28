import { createServer } from "node:http";

process.loadEnvFile();

const DESIRED_PORT = process.env.PORT ?? 3000;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "text/html; charset=utf-8");
      const { url } = req;

      if (url === "/") {
        res.end("<h1>Bienvenido a la Home</h1>");
      } else if (url === "/usuarios") {
        res.end("<h1>Lista de usuarios</h1>");
      } else {
        res.end("<h1>404 Not Found</h1>");
    } 

    if (url === "/json") {        
        res.setHeader("Content-Type", "application/json; charset=utf-8");
        const user = { name: 'midudev', role: 'admin' }
        res.end(JSON.stringify(user));
    } else {
           res.end("<h1>404 Not Found</h1>");
    }
});

server.listen(DESIRED_PORT, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${DESIRED_PORT}`,
  );
});