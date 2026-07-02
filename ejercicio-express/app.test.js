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