import { after, before, describe, test } from "node:test";
// test define una prueba
// describe agruupa pruebas relacionadas
// before se corre una vez antes de los test
// afte despues de los test

import assert from "node:assert";
// assert es el modulo para las comprobaciones

import app from "./app.js";
// importo mi aplicacion

// aca guardare el servidor
let server;

// creo una constante con el puerto que usare
const PORT = 3456;

// la direccion armada con ese puerto
const BASE_URL = `http://localhost:${PORT}`;

// Hago una funcion asincrona que recibe un obejto. 
// Si no le pasamos el path usa "/" y si no le pasamos el status usa 200 por defecto
const handleGetJsonAndCheckStatus = async ({ path = "/", status = 200 }) => {
  // normalizo el que el path funcione con "/jobs" o "jobs"  
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  // hago una peticion uniendo la url y la ruta base
  const response = await fetch(`${BASE_URL}${normalizedPath}`);

  // comparo las resupuestas
  assert.strictEqual(response.status, status);

  // lo transformo 
  const json = await response.json();

  // y retornamelo
  return { json };
};


// me corres esto anes de iniciar los test
before(async () => {
  return new Promise((resolve, reject) => {
    // entonces hago una prome donde si el puerto y el
    //  servidor arranco salio bien, y si me da un error
    server = app.listen(PORT, () => resolve());
    server.on("error", reject);
  });
});

after(async () => {
  // envuelve en una promesa
  await new Promise((resolve, reject) => {
    // cierra el servidor, esperado un posible erro
    server.close((err) => {
      // si hubo un error al cerrar, avisa a la promesa que fallo
      if (err) return reject(err);

      // si no todo bien
      resolve();
    });
  });
});

// describe agrupa los test relacionados con un titulo comun,
describe("GET /jobs", () => {
  // definimos una preuba individula
  test("debe responder con 200 y un array de trabajos", async () => {
    // hago la peticion al endpoint y espero (await) la respuesta
    const response = await fetch(`${BASE_URL}/jobs`);

    // compruebo que el status sea EXACTAMENTE 200 (OK)
    // si no es 200, el test falla aqui y no sigue
    assert.strictEqual(response.status, 200);

    // espera por la respuesta del objeto, y conviertela en json
    const json = await response.json();

    // si la respuseta es un array ok, si no dame este un mensaje de error
    assert.ok(Array.isArray(json.data), "La respuesta debe ser un array");
  });
});

// agrupamos los test realcionados con el POST a job
describe("POST /jobs", () => {
  // definimos una prueba
  test("debe crear un trabajo y responder 201", async () => {
    //  creamos el objeto que enviaremos como post
    const nuevoJob = {
      titulo: "Test Dev",
      empresa: "TestCorp",
      ubicacion: "Remoto",
      data: { technology: ["node"] },
    };

    // enviamos el objeto con un fetch
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoJob),
    });

    // verificamos que el status sea 201
    assert.strictEqual(response.status, 201);

    // tomamos la respuesta y la transformaaos en json
    const json = await response.json();

    // el job creado debe tener un id y conservar el titulo que mandamos
    assert.ok(json.id, "el trabajo creado debe tener un id");

    // comparamos el titulo dej trabajo creado con el trabajo nuevo
    assert.strictEqual(json.titulo, nuevoJob.titulo);
  });
});

// agrupamos los test realcionados con el PUT a job
describe("PUT /jobs/:id", () => {
  // Primer Test, reemplazar un job que si existe
  test("debe reemplazar un trabajo existente y responder 204", async () => {
    // primero creo un job para tener un id real
    // asi el test no depende de los id fijos que no podrian existi
    const creado = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Original",
        empresa: "X",
        ubicacion: "Y",
        data: { technology: ["node"] },
      }),
    });

    // extraigo el id del job recien creado
    const { id } = await creado.json();

    // ahora lo reemplazo completo
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Reemplazado",
        empresa: "NuevaEmpresa",
        ubicacion: "Presencial",
        data: { technology: ["node"] },
      }),
    });

    // verifico que el estado se 204
    assert.strictEqual(response.status, 204);

    // el 204 no trae body, así que verifico el cambio con un GET
    const getResponse = await fetch(`${BASE_URL}/jobs/${id}`);
    const json = await getResponse.json();

    // verifico que el titulo se haya reemplazado por el nuevo valor
    assert.strictEqual(json.titulo, "Reemplazado");
    // verifico  que el id no cambie
    assert.strictEqual(json.id, id); // el id no debe cambiar
  });

  // segundo Test si el trabajo no existe
  test("debe responder 404 si el trabajo no existe", async () => {
    // hago el envio del PUT directamente
    const response = await fetch(`${BASE_URL}/jobs/id-que-no-existe`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "xxx",
        empresa: "xxx",
        ubicacion: "xxx",
        data: { technology: ["node"] },
      }),
    });

    // verifico que el error sea 404
    assert.strictEqual(response.status, 404);
  });
});

// agrupamos los test realcionados con el PATCH a job
describe("PATCH /jobs/:id", () => {
  // primer test para actualizar un solo campo
  test("debe actualizar solo un campo y conservar el resto", async () => {
    // creo un job con varios campos
    const creado = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Sin tocar",
        empresa: "EmpresaOriginal",
        ubicacion: "Remoto",
        data: { technology: ["node"] },
      }),
    });

    // extraigo el id como en los anteriores
    const { id } = await creado.json();

    // solo cambio el titulo
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: "Titulo nuevo" }),
    });

    // verifico que la respuesta sea 204
    assert.strictEqual(response.status, 204);

    // el 204 no trae body, asi que verifico el cambio con un GET
    const getResponse = await fetch(`${BASE_URL}/jobs/${id}`);
    const json = await getResponse.json();

    // verififco el titulo
    assert.strictEqual(json.titulo, "Titulo nuevo");

    // y la empresa
    assert.strictEqual(json.empresa, "EmpresaOriginal");
  });
});

// agrupamos los test realcionados con el DELETE a job
describe("DELETE /jobs/:id", () => {
  // primer test para eliminar trabajo existente
  test("debe eliminar un trabajo existente y responder 204", async () => {
    // creo un job para borrarlo
    const creado = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Para borrar",
        empresa: "Xxx",
        ubicacion: "Yyy",
        data: { technology: ["node"] },
      }),
    });

    const { id } = await creado.json();

    // lo borro
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    });
    console.log(" EEEEEEEEEEEEEEe", response.status);

    assert.strictEqual(response.status, 204);

    // verifico que ya no exista: un GET debe dar 404
    const getResponse = await fetch(`${BASE_URL}/jobs/${id}`);
    assert.strictEqual(getResponse.status, 404);
  });

  // test para borrar un trabajo inexistente
  test("debe responder 404 al borrar un id inexistente", async () => {
    const response = await fetch(`${BASE_URL}/jobs/id-que-no-existe`, {
      method: "DELETE",
    });

    assert.strictEqual(response.status, 404);
  });
});

// para los GET realacionados con /job y susu filtros
describe("GET /jobs con filtro de texto", () => {
  //  test para cuando buscamos algo los resultados que coinciden
  test("todos los resultados deben coincidir con el texto buscado", async () => {
    // el termino que vamos a buscar
    const tech = "javascript";

    // hago el get pasando como filtro el queryparams
    const response = await fetch(`${BASE_URL}/jobs?technology=${tech}`);

    assert.strictEqual(response.status, 200);

    const json = await response.json();

    // cada job devuelto debe contener el término en titulo o descripcion

    // (no asumo cuántos hay, solo que TODOS cumplen el filtro)

    // si todos coinciden dame true (gracias a .every( ))

    const todosCoinciden = json.data.every((job) => {
      const techs = job.data?.technology ?? [];
      return techs.map((t) => t.toLowerCase()).includes(tech);
    });

    // verifico que la condicion se cumpla
    assert.ok(
      todosCoinciden,
      "todos los resultados deben contener el texto buscado",
    );
  });

  // test para devolver un array vacio
  test("un texto imposible debe devolver un array vacío", async () => {
    const response = await fetch(`${BASE_URL}/jobs?text=xyzabc123noexiste`);

    assert.strictEqual(response.status, 200);

    const json = await response.json();

    // el array de datos debe estar vacio (length 0)
    assert.strictEqual(json.data.length, 0, "no debe haber resultados");

    // y el total tambien debe ser 0 (ningun job cumple el filtro)
    assert.strictEqual(json.total, 0, "el total debe ser 0");
  });

  test("sin filtro de texto debe devolver resultados", async () => {
    // GET normal, sin ningun queryparams
    const response = await fetch(`${BASE_URL}/jobs`);

    assert.strictEqual(response.status, 200);

    const json = await response.json();

    // la lista no esta vacia
    assert.ok(json.data.length > 0, "debe haber al menos un trabajo");
  });
});

// Get para la pagincaion en /job
describe("GET /jobs con paginación", () => {
  // registrin la cantidad de resultados
  test("limit debe restringir la cantidad de resultados", async () => {
    // hacemos un limite
    const limit = 2;

    // hacemos un get con el limite como queryparams
    const response = await fetch(`${BASE_URL}/jobs?limit=${limit}`);

    assert.strictEqual(response.status, 200);

    const json = await response.json();

    // no debe devolver MÁS de 'limit' resultados
    assert.ok(
      json.data.length <= limit,
      `no debe devolver más de ${limit} resultados`,
    );
    assert.strictEqual(json.limit, limit, "el limit devuelto debe coincidir");
  });

  test("offset debe saltar resultados", async () => {
    // pido la primera página y la segunda con el mismo limit
    const primera = await (
      await fetch(`${BASE_URL}/jobs?limit=1&offset=0`)
    ).json();
    const segunda = await (
      await fetch(`${BASE_URL}/jobs?limit=1&offset=1`)
    ).json();

    // si hay al menos 2 jobs, el primero de cada página debe ser distinto
    if (primera.total >= 2) {
      assert.notStrictEqual(
        primera.data[0].id,
        segunda.data[0].id,
        "offset debe devolver un trabajo diferente",
      );
    }
  });

  test("el total no cambia con la paginación", async () => {
    // total refleja TODOS los que cumplen el filtro, no solo la página
    const sinPaginar = await (await fetch(`${BASE_URL}/jobs`)).json();
    const paginado = await (await fetch(`${BASE_URL}/jobs?limit=1`)).json();

    assert.strictEqual(
      sinPaginar.total,
      paginado.total,
      "el total debe ser el mismo aunque cambie el limit",
    );
  });
});

describe("GET /jobs/:id", () => {
  test("debe devolver el trabajo con el id especificado", async () => {
    // id real del JSON
    const id = "7a4d1d8b-1e45-4d8c-9f1a-8c2f9a9121a4";

    const response = await fetch(`${BASE_URL}/jobs/${id}`);

    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.strictEqual(json.id, id);
  });

  test("debe responder 404 y un campo error si el id no existe", async () => {
    const response = await fetch(`${BASE_URL}/jobs/id-que-no-existe`);

    assert.strictEqual(response.status, 404);

    const json = await response.json();
    assert.ok(json.error, "la respuesta debe contener un campo error");
  });
});

describe("POST /jobs validacion", () => {
  // helper: un body base válido al que le cambiamos una cosa en cada test
  const jobValido = {
    titulo: "Trabajo valido",
    empresa: "Empresa",
    ubicacion: "Remoto",
    descripcion: "Una descripcion",
    data: { technology: ["node"] },
  };

  test("titulo con menos de 3 caracteres debe dar 400", async () => {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...jobValido, titulo: "ab" }),
    });
    assert.strictEqual(response.status, 400);
  });

  test("titulo con más de 100 caracteres debe dar 400", async () => {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...jobValido, titulo: "a".repeat(101) }),  
    });
    assert.strictEqual(response.status, 400);
  });

  test("sin titulo debe dar 400", async () => {
    const { titulo, ...sinTitulo } = jobValido; // quito el titulo
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sinTitulo),
    });
    assert.strictEqual(response.status, 400);
  });

  test("titulo que no es string debe dar 400", async () => {
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...jobValido, titulo: 12345 }), // número, no string
    });
    assert.strictEqual(response.status, 400);
  });

  test("sin descripcion (opcional) debe dar 201", async () => {
    const { descripcion, ...sinDescripcion } = jobValido; 
    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sinDescripcion),
    });
    assert.strictEqual(response.status, 201);
  });
});
