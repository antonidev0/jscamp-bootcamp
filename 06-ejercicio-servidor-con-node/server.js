import { createServer } from "node:http";  
import { json } from "node:stream/consumers";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises"; // lee los archivos nativos y te los da en bruto

process.loadEnvFile();

const DESIRED_PORT = process.env.PORT ?? 3000;

const server = createServer(async (req, res) => {
  const { method, url } = req; //dentro del req, toma el objeto url y el metodo y guardalo
 
  // traeme los datos de data en texto y damelos como un array de obejetos
  const users = JSON.parse(await readFile("./data.json", "utf-8"));

  // tomamos la url para separarla de los parametros
  const parsedUrl = new URL(url, `http://localhost:${DESIRED_PORT}`);

  // tomamos los query de la url
  const pathname = parsedUrl.pathname;

  function sendJson(res, statusCode, data) {
    res.statusCode = statusCode; // oye, el estado de la respuesta, es el estado que te envie
    res.setHeader("Content-Type", "application/json; charset=utf-8"); //aqui te voy a enviar un json
    res.end(JSON.stringify(data)); // la respuesta final sera un json con los datos
  }

  if (method === "GET") {
    if (parsedUrl.pathname === "/users") {

      // buscamos el parametro name dentro de la url
      const nameFilter = parsedUrl.searchParams.get("name");
      console.log(nameFilter);
      

      // los nombres filtrado van a ser igual a los usuairos
      let filteredUsers = users;

      // si en los parametros existe "name"
      if (nameFilter) {
        // filtramos usuarios cuyo nombre contenga el texto (sin distinguir mayusculas)
        filteredUsers = users.filter((user) =>
          user.name.toLowerCase().includes(nameFilter.toLowerCase()),
        );
      }

      // y luego me envias los usuraios que filtraste
      return sendJson(res, 200, filteredUsers);
 
    } else if (parsedUrl.pathname === "/health") {
      return sendJson(res, 200, { status: "ok", uptime: process.uptime() });
    }
  }

  if (method === "POST") {
    if (parsedUrl.pathname === "/users") {
      const body = await json(req);

      if (!body || !body.name || !body.age) {
        return sendJson(res, 400, {
          error: "Todos los campos son obligatorios",
        });
      }

      const newUsers = [
        {
          id: randomUUID(),
          name: body.name,
          age: body.age,
        },
      ];

      users.push(newUsers);

      return sendJson(res, 201, { message: "usuario creado" });
    }
  }

  if (parsedUrl.pathname === "/") {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    // si la url es / muestrae este elemento html
    res.end("<h1>Bienvenido a la Home</h1>");
  } else if (url === "/usuarios") {
    // si es /usuarios muestrame
    res.end("<h1>Lista de usuarios</h1>");
  } else {
    // si no es ninguna de las anterioeres envia este error
    return sendJson(res, 404, { error: "Ruta no Encontrada" });
  }
});

server.listen(DESIRED_PORT, () => { 
  console.log(`Servidor escuchando en http://localhost:${DESIRED_PORT}`);
});
