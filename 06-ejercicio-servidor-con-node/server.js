import { createServer } from "node:http";  
import { json } from "node:stream/consumers";
import { randomUUID } from "node:crypto";

process.loadEnvFile();

const DESIRED_PORT = process.env.PORT ?? 3000;

const server = createServer(async (req, res) => {
  // TODO: Aquí irá la lógica del servidor
  const { method, url } = req; //dentro del req, toma el objeto url y el metodo y guardalo

  function sendJson(res, statusCode, data) {
    res.statusCode = statusCode; // oye, el estado de la respuesta, es el estado que te envie
    res.setHeader("Content-Type", "application/json; charset=utf-8"); //aqui te voy a enviar un json
    res.end(JSON.stringify(data)); // la respuesta final sera un json con los datos
  } 

  if (method === "GET") {
    if (url === "/users") {
      // si la url es /json retorname este objeto
      return sendJson(res, 200, users);
    } else if (url === "/health") {
      return sendJson(res, 200, { status: "ok", uptime: process.uptime() });
    }
  }

  if (method === "POST") {
    if (url === "/users") {
      const body = await json(req);

      if (!body || !body.name) {
        return sendJson(res, 400, { error: "cuerpo requerido" });
      }

      const newUsers = [
        {
          id: randomUUID(),
          name: body.name,
        },
      ];

      users.push(newUsers);

      return sendJson(res, 201, { message: "usuario creado" });
    }
  }

  if (url === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // si la url es / muestrae este elemento html
    res.end("<h1>Bienvenido a la Home</h1>");
  } else if (url === "/usuarios") {
    // si es /usuarios muestrame
    res.end("<h1>Lista de usuarios</h1>");
  } else {
    // si no es ninguna de las anterioeres envia este error
    return sendJson(res, 404, { error: "Not Found" });
  }
});

server.listen(DESIRED_PORT, () => { 
  console.log(`Servidor escuchando en http://localhost:${DESIRED_PORT}`);
});

const users = [
  {
    id: "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d",
    name: "Miguel",
    age: 28,
  },
  {
    id: "f6e5d4c3-b2a1-4f5e-6d7c-8b9a0e1f2a3b",
    name: "Mateo",
    age: 34,
  },
  {
    id: "9a8b7c6d-5e4f-4a3b-2c1d-0e9f8a7b6c5d",
    name: "Pablo",
    age: 22,
  },
  {
    id: "3c4d5e6f-7a8b-4c9d-0e1f-2a3b4c5d6e7f",
    name: "Lucía",
    age: 31,
  },
  {
    id: "7b8c9d0e-1f2a-4b3c-4d5e-6f7a8b9c0d1e",
    name: "Ana",
    age: 26,
  },
  {
    id: "5d6e7f8a-9b0c-4d1e-2f3a-4b5c6d7e8f9a",
    name: "Juan",
    age: 29,
  },
  {
    id: "2a3b4c5d-6e7f-4a8b-9c0d-1e2f3a4b5c6d",
    name: "Sofía",
    age: 25,
  },
  {
    id: "8f9a0b1c-2d3e-4f5a-6b7c-8d9e0f1a2b3c",
    name: "Carlos",
    age: 37,
  },
  {
    id: "4c5d6e7f-8a9b-4c0d-1e2f-3a4b5c6d7e8f",
    name: "Elena",
    age: 23,
  },
  {
    id: "0e1f2a3b-4c5d-4e6f-7a8b-9c0d1e2f3a4b",
    name: "Diego",
    age: 30,
  },
];
