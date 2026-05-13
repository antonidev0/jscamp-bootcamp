import { createServer } from "node:http";

process.loadEnvFile();

const DESIRED_PORT = process.env.PORT ?? 3000;

const server = createServer((req, res) => {
      const { url } = req;

  function sendJson(res, statusCode, data) {
    res.statusCode = statusCode
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(data))
  }

    if (url === "/") {
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end("<h1>Bienvenido a la Home</h1>");
      }
      else if (url === "/usuarios") {
        res.end("<h1>Lista de usuarios</h1>");
      }
      else if (url === "/json") {        
      return sendJson(res, 200, [
        { id: 1, name: 'Alicia' },
        { id: 2, nae: 'Bob'},
         ])
      } else { 
      return sendJson(res, 404, { error: 'Not Found'})
    }
});

server.listen(DESIRED_PORT, () => {
  console.log(
    `Servidor escuchando en el puerto http://localhost:${DESIRED_PORT}`,
  );
});