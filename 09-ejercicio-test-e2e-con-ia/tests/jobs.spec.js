/* Aquí irá el código de tu test */

// @ts-check
// import { test, expect } from '@playwright/test'
// @ts-check
import { test, expect } from "@playwright/test";

test("buscar empleos y aplicar ofertas", async ({ page }) => {
  // ir a la pagina principal
  await page.goto("http://localhost:5173/");

  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("React");

  await page.getByRole("button", { name: "Buscar" }).click();

  const jobCards = page.locator(".job-listing-card");

  await expect(jobCards.first()).toBeVisible();

  const firstJobTitle = jobCards.first().locator("h3");

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
  const jobCards = page.locator(".job-listing-card");
  await expect(jobCards.first()).toBeVisible();
});


// cuarto ejercicio
test(" Test de flujo completo de aplicacion", async ({ page }) => {
  // navego a la pagina principal
  await page.goto("http://localhost:5173/");

  // usco empleos con "JavaScript"
  const searchInput = page.getByRole("searchbox");
  await searchInput.fill("JavaScript");
  await page.getByRole("button", { name: "Buscar" }).click();

  // espero a que aparezcan los resultados (la primera tarjeta visible)
  const jobCards = page.locator(".job-listing-card");
  await expect(jobCards.first()).toBeVisible();

  //   hago click para ver los detalles
  await jobCards.first().getByRole("link", { name: /ver detalles/i }).click();

  // verifico que se muestre el detalle del empleo
  const jobTitle = page.locator("h3");
  await expect(jobTitle.first()).toBeVisible();

    // hacemos click en iniciar sesion
  await page.getByRole("button", { name: "Iniciar sesión" }).click();

    // click en aplicar
  const applyButton = page.getByRole("button", { name: "Aplicar" }).first();
  await applyButton.click();

//   verificar si el boton cambio a aplicar
  await expect(page.getByRole("button", { name: "Aplicado" })).toBeVisible();
});
