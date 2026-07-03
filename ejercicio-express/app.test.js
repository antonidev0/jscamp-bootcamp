import { test, describe, before, after } from "node:test";
import assert, { rejects } from "node:assert";
import app from "./app.js";
import { resolve } from "node:dns";

let server;
const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

before(async () => {
  return new Promise((resolve, reject) => {
    server = app.listen(PORT, () => resolve());
    server.on("error", reject);
  });
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => {
      if (err) return reject(err);
      resolve();
    });
  });
});

describe("GET /jobs", () => {
  test("debe responder con 200 y un array de trabajos", async () => {
    const response = await fetch(`${BASE_URL}/jobs`);
    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.ok(Array.isArray(json.data), "La respuesta debe ser un array");
  });
});

describe("POST /jobs", () => {
  test("debe crear un trabajo y responder 201", async () => {
    const nuevoJob = {
      titulo: "Test Dev",
      empresa: "TestCorp",
      ubicacion: "Remoto",
      data: "Node.js",
    };

    const response = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(nuevoJob),
    });

    assert.strictEqual(response.status, 201);

    const json = await response.json();

    // el job creado debe tener un id y conservar el titulo que mandamos
    assert.ok(json.id, "el trabajo creado debe tener un id");
    assert.strictEqual(json.titulo, nuevoJob.titulo);
  });
});

describe("PUT /jobs/:id", () => {
  test("debe reemplazar un trabajo existente y responder 200", async () => {
    // primero creo un job para tener un id real
    const creado = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Original",
        empresa: "X",
        ubicacion: "Y",
        data: "Z",
      }),
    });
    const { id } = await creado.json();

    // ahora lo reemplazo completo
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Reemplazado",
        empresa: "NuevaEmpresa",
        ubicacion: "Presencial",
        data: "React",
      }),
    });

    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.strictEqual(json.titulo, "Reemplazado");
    assert.strictEqual(json.id, id); // el id no debe cambiar
  });

  test("debe responder 404 si el trabajo no existe", async () => {
    const response = await fetch(`${BASE_URL}/jobs/id-que-no-existe`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "x",
        empresa: "x",
        ubicacion: "x",
        data: "x",
      }),
    });

    assert.strictEqual(response.status, 404);
  });
});

describe("PATCH /jobs/:id", () => {
  test("debe actualizar solo un campo y conservar el resto", async () => {
    // creo un job con varios campos
    const creado = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Sin tocar",
        empresa: "EmpresaOriginal",
        ubicacion: "Remoto",
        data: "Vue",
      }),
    });
    const { id } = await creado.json();

    // solo cambio el titulo
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo: "Titulo nuevo" }),
    });

    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.strictEqual(json.titulo, "Titulo nuevo"); // cambió
    assert.strictEqual(json.empresa, "EmpresaOriginal"); // se conservó
  });
});

describe("DELETE /jobs/:id", () => {
  test("debe eliminar un trabajo existente y responder 200", async () => {
    // creo un job para borrarlo
    const creado = await fetch(`${BASE_URL}/jobs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        titulo: "Para borrar",
        empresa: "X",
        ubicacion: "Y",
        data: "Z",
      }),
    });
    const { id } = await creado.json();

    // lo borro
    const response = await fetch(`${BASE_URL}/jobs/${id}`, {
      method: "DELETE",
    });

    assert.strictEqual(response.status, 200);

    // verifico que ya no exista: un GET debe dar 404
    const getResponse = await fetch(`${BASE_URL}/jobs/${id}`);
    assert.strictEqual(getResponse.status, 404);
  });

  test("debe responder 404 al borrar un id inexistente", async () => {
    const response = await fetch(`${BASE_URL}/jobs/id-que-no-existe`, {
      method: "DELETE",
    });

    assert.strictEqual(response.status, 404);
  });
});

describe("GET /jobs con filtro de texto", () => {
  test("todos los resultados deben coincidir con el texto buscado", async () => {
    const searchTerm = "react";
    const response = await fetch(`${BASE_URL}/jobs?text=${searchTerm}`);

    assert.strictEqual(response.status, 200);

    const json = await response.json();

    // cada job devuelto debe contener el término en titulo o descripcion
    // (no asumo cuántos hay, solo que TODOS cumplen el filtro)
    const todosCoinciden = json.data.every((job) => {
      const titulo = (job.titulo ?? "").toLowerCase();
      const descripcion = (job.descripcion ?? "").toLowerCase();
      return titulo.includes(searchTerm) || descripcion.includes(searchTerm);
    });

    assert.ok(
      todosCoinciden,
      "todos los resultados deben contener el texto buscado",
    );
  });

  test("un texto imposible debe devolver un array vacío", async () => {
    const response = await fetch(`${BASE_URL}/jobs?text=xyzabc123noexiste`);

    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.strictEqual(json.data.length, 0, "no debe haber resultados");
    assert.strictEqual(json.total, 0, "el total debe ser 0");
  });

  test("sin filtro de texto debe devolver resultados", async () => {
    const response = await fetch(`${BASE_URL}/jobs`);

    assert.strictEqual(response.status, 200);

    const json = await response.json();
    assert.ok(json.data.length > 0, "debe haber al menos un trabajo");
  });
});

describe("GET /jobs con paginación", () => {
  test("limit debe restringir la cantidad de resultados", async () => {
    const limit = 2;
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