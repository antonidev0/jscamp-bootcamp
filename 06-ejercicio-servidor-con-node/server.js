import { createServer } from "node:http";  
import { json } from "node:stream/consumers";
import { randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises"; // lee los archivos nativos y te los da en bruto
import dataJobs from "./data.json" with { type: "json" }; //mas rapido

process.loadEnvFile();

const DESIRED_PORT = process.env.PORT ?? 3000;

// traeme los datos de data en texto y damelos como un array de obejetos  

const server = createServer(async (req, res) => {
  const { method, url } = req; //dentro del req, toma el objeto url y el metodo y guardalo

  // tomamos la url para separarla de los parametros
  const parsedUrl = new URL(url, `http://localhost:${DESIRED_PORT}`);

  // tomamos los query de la url
  // const pathname = parsedUrl.pathname;
  // no sabia que igual leia el pathname

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
      let filteredUsers = dataJobs;

      // si en la url existe "name"
      if (nameFilter) {
        // filtramos usuarios cuyo nombre contenga el texto (sin distinguir mayusculas)
        filteredUsers = dataJobs.filter((user) =>
          // dame el nombre del filtro de la url en minuscula y si
          //  en el nombre de los usuarios incluye alguna letra de lo que busque , damelo
          user.name.toLowerCase().includes(nameFilter.toLowerCase()),
        );
      }

      // si en la url existe minAge
      if (minAge) {

        // quiero que la edad minima sea un siempre un numero
        const minAgeNumber = Number(minAge); 
        // sera invalido si es menor a cero o si no es un numero 
        const isInvalidNumber = Number.isNaN(minAgeNumber) || minAgeNumber < 0;
        
        // si es un numero invalido 
        if (isInvalidNumber) return sendJson(res, 400, { error: "minAge debe ser un numero valido" })
        
        // si la edad del usuario es mayor o igual al minimo dejalo en la list
        filteredUsers = filteredUsers.filter(
          (user) => user.age >= Math.floor(minAgeNumber),
        );
      }

      // i en la url existe maxAge
      if (maxAge) {
        
        // mismas condiciones que en minAge
        const maxAgeNumber = Number(maxAge)
        const isInvalidNumber = Number.isNaN(maxAgeNumber) || maxAgeNumber < 0
        
        if (isInvalidNumber) return sendJson(res, 400, { error: "maxAge debe ser un numero valido" })
        // si la edad del usuario es menor o igual al maximo dejalo en la lista
        filteredUsers = filteredUsers.filter(
          (user) => user.age <= Math.floor(maxAge),
        );
      }

      // si en la url existe limit y offset
      if (limit && offset) {
        // el numero limite de la cantidad de usuarios a devolver es
        const numLimit = Number(limit);
        // cantidad de usuarios a saltar desde el inicio es
        const numOffset = Number(offset);

        // si es menor a cero o dirente a un numero es invalido
        const isInvalidLimit = Number.isNaN(numLimit) || numLimit < 0;
        const isInvalidOffset = Number.isNaN(numOffset) || numOffset < 0;
        
        if (isInvalidLimit || isInvalidOffset) {
          return sendJson(res, 400, { error: "limit y offset deben ser numeros validos" });
        }

        // dame el nummero limite de los usuarios con la cantidad a saltarse, y
        //  separamelo de los usuarios filtrados
        // Evitamos decimales
        filteredUsers = filteredUsers.slice(Math.floor(numOffset), Math.floor(numOffset + numLimit));
      }

      // y luego me envias los usuraios que filtraste
      return sendJson(res, 200, filteredUsers);
    }
    
    if (parsedUrl.pathname === "/health") {
      return sendJson(res, 200, { status: "ok", uptime: process.uptime() });
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

  }

  if (method === "POST") {
    if (parsedUrl.pathname === "/users") {
      const body = await json(req); 

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
      

      dataJobs.push(newUser);

      return sendJson(res, 201, { message: "usuario creado" });
    }
  }

  
});

server.listen(DESIRED_PORT, () => { 
  console.log(`Servidor escuchando en http://localhost:${DESIRED_PORT}`);
});
