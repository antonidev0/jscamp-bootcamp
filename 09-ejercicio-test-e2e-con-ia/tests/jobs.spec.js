/* Aquí irá el código de tu test */

// @ts-check
// import { test, expect } from '@playwright/test'
// @ts-check
import { expect, test } from "@playwright/test";

// primero, segundo y tercer ejercicio
test("buscar empleos y aplicar ofertas", async ({ page }) => {
  // ir a la pagina principal
  await page.goto("http://localhost:5173/");

  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("React");

  await page.getByRole("button", { name: "Buscar" }).click();

  const jobCards = page.locator(".job-listing-card");

  await expect(jobCards.first()).toBeVisible();

  const firstJobTitle = jobCards.first().getByRole("heading", {
    level: 3,
    name: /desarrollador/i,
  });

  await expect(firstJobTitle).toHaveText(/desarrollador/i);

  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  const applyButton = page.getByRole("button", { name: "Aplicar" }).first();
  await applyButton.click();

  await expect(page.getByRole("button", { name: "Aplicado" })).toBeVisible();
});

test("buscar empleos por tecnologia muestra resultados", async ({ page }) => {
  // navego a la pagina principal
  await page.goto("http://localhost:5173/");

  // localizo el buscador y escribo React
  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("React");

  // hago clic en Buscar
  await page.getByRole("button", { name: "Buscar" }).click();

  // verifico que aparecen resultados y el primero es visible
   await page.waitForTimeout(1000);
  const jobCards = page.getByRole("article");
  await expect(jobCards.first()).toBeVisible();
 
});

// cuarto ejercicio
test(" Test de flujo completo de aplicacion", async ({ page }) => {
  // navego a la pagina principal
  await page.goto("http://localhost:5173/");

  // Busco empleos con "JavaScript"
  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("JavaScript");
  await page.getByRole("button", { name: "Buscar" }).click();

  // espero a que aparezcan los resultados (la primera tarjeta visible)
  const jobCards = page.locator(".job-listing-card");
  await expect(jobCards.first()).toBeVisible();

  // guardo el titulo del primer empleo (de la lista, en su h3)
  const tituloEnLista = (
    await jobCards.first().getByRole("heading", { level: 3 }).textContent()
  ).trim();

  // hago clic para ver los detalles
  await jobCards
    .first()
    .getByRole("link", { name: /ver detalles/i })
    .click();

  // verifico que el detalle muestra ESE mismo titulo en un h1
  await expect(
    page.getByRole("heading", { level: 1, name: tituloEnLista }),
  ).toBeVisible();

  // hacemos click en iniciar sesion
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

  // click en aplicar
  const applyButton = page.getByRole("button", { name: "Aplicar" }).first();
  await applyButton.click();

  // verificar si el botón cambio a "Aplicado"
  await expect(
    page.getByRole("button", { name: "Aplicado" }).first(),
  ).toBeVisible();
});

// quinto ejercicio
test("filtrar por ubicación Remoto muestra solo remotos", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  // busco el link solo dentro de la navegación
  await page
    .getByRole("navigation")
    .getByRole("link", { name: /empleos/i })
    .click();

  // selecciono el filtro para buscar trabajos remotos
  await page.locator("#filter-location").selectOption("remoto");

  // selecciona las tarjetas con los empleos
  const jobCards = page.locator(".job-listing-card");
  // espera a que la primera sea visible en pantalla
  await expect(jobCards.first()).toBeVisible();

  // cuento el total de empleos que hay
  const total = await jobCards.count();

  // las recorro una por una empezando desde cero
  for (let i = 0; i < total; i++) {
    // nth(i) accede a la tarjeta en la posicion i
    // y verifico que su texto contenga "remoto" (sin importar mayuscula)
    await expect(jobCards.nth(i)).toContainText(/remoto/i);
  }
});

test("filtrar por nivel Senior muestra empleos senior", async ({ page }) => {
  await page.goto("http://localhost:5173/");

  await page
    .getByRole("navigation")
    .getByRole("link", { name: /empleos/i })
    .click();

  // selecciono el filtro de nivel senior
  await page.locator("#filter-experience-level").selectOption("senior");

  // espero a que la URL refleje el filtro (la app ya reacciono)
  await page.waitForURL(/experience=senior/);

  const jobCards = page.locator(".job-listing-card");
  await expect(jobCards.first()).toBeVisible();

  // verifico que todos los resultados sean de nivel senior
  const total = await jobCards.count();
  for (let i = 0; i < total; i++) {
    await expect(jobCards.nth(i)).toHaveAttribute("data-nivel", "senior");
  }
});

// Sexto ejercicio
test("aparece la paginación cuando hay resultados suficientes", async ({
  page,
}) => {
  // voy a la pagina principal
  await page.goto("http://localhost:5173/");

  // abro la pagina de empleos
  await page
    .getByRole("navigation")
    .getByRole("link", { name: /empleos/i })
    .click();

  // verifico que el componente de paginacion es visible
  const pagination = page.getByRole("navigation", { name: /paginacion/i });
  await expect(pagination).toBeVisible();
});

test("navegar a la siguiente página cambia los resultados", async ({
  page,
}) => {
  await page.goto("http://localhost:5173/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: /empleos/i })
    .click();

  const jobCards = page.locator(".job-listing-card");
  await expect(jobCards.first()).toBeVisible();

  // guardo el titulo del primer resultado de la pagina 1
  const tituloAntes = await jobCards.first().locator("h3").textContent();

  // hago clic en "Siguiente"
  await page.getByRole("link", { name: /siguiente/i }).click();

  // espero a que carguen los nuevos resultados y comparo
  await expect(jobCards.first()).toBeVisible();
  const tituloDespues = await jobCards.first().locator("h3").textContent();

  // los resultados deben haber cambiado
  expect(tituloAntes).not.toBe(tituloDespues);
});

// septimo ejercicio
// aunque se parece al cuarto
test("muestra el detalle del empleo seleccionado", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: /empleos/i })
    .first()
    .click();

  const jobCards = page.locator(".job-listing-card");
  await expect(jobCards.first()).toBeVisible();

  // guardo el titulo del empleo antes de entrar
  const tituloEnLista = await jobCards.first().locator("h3").textContent();

  await jobCards
    .first()
    .getByRole("link", { name: /ver detalles/i })
    .click();

  // el detalle muestra el titulo en un h1
  const tituloDetalle = page.locator("h1").nth(1);

  await expect(tituloDetalle).toBeVisible();

  // y debe ser el MISMO empleo que elegi
  await expect(tituloDetalle).toHaveText(tituloEnLista);
});

test("se puede aplicar a un empleo", async ({ page }) => {
  await page.goto("http://localhost:5173/");
  await page
    .getByRole("navigation")
    .getByRole("link", { name: /empleos/i })
    .first()
    .click();

  const jobCards = page.locator(".job-listing-card");
  await expect(jobCards.first()).toBeVisible();
  await jobCards
    .first()
    .getByRole("link", { name: /ver detalles/i })
    .click();

  // inicio sesion
  await page.getByRole("button", { name: /iniciar sesión/i }).click();

  // hay DOS botones de aplicar (header y footer), tomo el primero
  const applyButton = page
    .getByRole("button", { name: "Aplicar ahora" })
    .first();
  await expect(applyButton).toBeVisible();
  await applyButton.click();

  // el mismo boton ahora dice "Aplicado"
  await expect(
    page.getByRole("button", { name: "Aplicado" }).first(),
  ).toBeVisible();

  // ahora AMBOS botones deben decir "Aplicado" (comparten el mismo estado)
  const botonesAplicado = page.getByRole("button", { name: "Aplicado" });
  await expect(botonesAplicado).toHaveCount(2);
});
