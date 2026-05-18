import { createServer } from "node:http"; // dame la funcion para crear un servidor
import { json } from "node:stream/consumers";
import { randomUUID } from "node:crypto";

process.loadEnvFile(); //lee las variables de entorno

const DESIRED_PORT = process.env.PORT ?? 3000; //usa el puerto de mi variable de entorno, si no (esta o no existe) usa el puerto 3000

const server = createServer(async (req, res) => { 
  const { method, url } = req; //dentro del req, toma el objeto url y el metodo y guardalo

  function sendJson(res, statusCode, data) {
    res.statusCode = statusCode // oye, el estado de la respuesta, es el estado que te envie
    res.setHeader('Content-Type', 'application/json; charset=utf-8') //aqui te voy a enviar un json
    res.end(JSON.stringify(data)) // la respuesta final sera un json con los datos
  }

  if (method === "GET") { 
    if (url === "/users") {   
      // si la url es /json retorname este objeto
      return sendJson(res, 200, users)
    } else if ( url === "/health") {
      return sendJson(res, 200, { status: 'ok', uptime: process.uptime()})
    }
  }
  
  if (method === "POST") {
    if (url === "/users") { 
      const body = await json(req) 

      if (!body || !body.name) {
        return sendJson(res, 400, { error : "cuerpo requerido"})
      }
      
      const newUsers = [{
        id: randomUUID(),
        name: body.name
      }] 

      users.push(newUsers)

       return sendJson(res, 201, { message: "usuario creado"});
     }
  }

    if (url === "/") {
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      // si la url es / muestrae este elemento html
        res.end("<h1>Bienvenido a la Home</h1>");
      }
    else if (url === "/usuarios") {
      // si es /usuarios muestrame 
        res.end("<h1>Lista de usuarios</h1>");
    }
     else { 
      // si no es ninguna de las anterioeres envia este error
      return sendJson(res, 404, { error: 'Not Found'})
    }
});

  const users = [
    { id: 1, name: "Alicia" },
    { id: 2, name: "Bob" },
  ];

server.listen(DESIRED_PORT, () => {
  // reserva y escucha el puerto DESIRED_PORT que ya habia hecho
  // y ejecutalo solo cuando ya estes listo
  console.log(
    `Servidor escuchando en el puerto http://localhost:${DESIRED_PORT}`, 
  );
});