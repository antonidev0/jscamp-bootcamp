import { createServer } from "node:http";  
import { json } from "node:stream/consumers";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises"; // lee los archivos nativos y te los da en bruto

process.loadEnvFile();

const DESIRED_PORT = process.env.PORT ?? 3000;

// traeme los datos de data en texto y damelos como un array de obejetos
  // (lo dejo aca para que cargue una vez y guarde los cambios del post en cada sesion)
  const users = JSON.parse(await readFile("./data.json", "utf-8"));


const server = createServer(async (req, res) => {
  const { method, url } = req; //dentro del req, toma el objeto url y el metodo y guardalo

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

      // Si continene name (ejem> /users?name)
      const nameFilter = parsedUrl.searchParams.get("name");
      // si contiene limit (ejem> /users?limit) (cantidad maxima de usuarios a devolver)
      const limit = parsedUrl.searchParams.get("limit");
      // si contiene ofset (ejm /users?offset o /users?limit&offset) (cantidad de usuarios a saltar desde el inicio)
      const offset = parsedUrl.searchParams.get("offset");
      // // si contiene minAge (ejm /users?minAge=25&maxAge=30)
      const minAge = parsedUrl.searchParams.get("minAge");
      // si contiene maxAge (ejem  /users?minAge=25&maxAge=30)
      const maxAge = parsedUrl.searchParams.get("maxAge");

      // los nombres filtrado van a ser igual a los usuairos
      let filteredUsers = users;

      // si en la url existe "name"
      if (nameFilter) {
        // filtramos usuarios cuyo nombre contenga el texto (sin distinguir mayusculas)
        filteredUsers = users.filter((user) =>
          // dame el nombre del filtro de la url en minuscula y si
          //  en el nombre de los usuarios incluye alguna letra de lo que busque , damelo
          user.name.toLowerCase().includes(nameFilter.toLowerCase()),
        );
      }

      // si en la url existe minAge
      if (minAge) {
        // si la edad del usuario es mayor o igual al minimo dejalo en la list
        filteredUsers = filteredUsers.filter(
          (user) => user.age >= Number(minAge),
        );
      }

      // i en la url existe maxAge
      if (maxAge) {
        // si la edad del usuario es menor o igual al maximo dejalo en la lista
        filteredUsers = filteredUsers.filter(
          (user) => user.age <= Number(maxAge),
        );
      }

      // si en la url existe limit y offset
      if (limit && offset) {
        // el numero limite de la cantidad de usuarios a devolver es
        const numLimit = Number(limit);
        // cantidad de usuarios a saltar desde el inicio es
        const numOffset = Number(offset);

        // dame el nummero limite de los usuarios con la cantidad a saltarse, y separamelo de los usuarios filtrados
        filteredUsers = filteredUsers.slice(numOffset, numOffset + numLimit);
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
      console.log(body, "Aaaaaaaaaa");
      

      if (!body || !body.name || !body.age) {
        return sendJson(res, 400, {
          error: "Todos los campos son obligatorios",
        });
      }

      const newUser =
      {
        id: randomUUID(),
        name: body.name,
        age: body.age,
      };
      

      users.push(newUser);

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
