// @ts-check
import { test, expect } from '@playwright/test';

test('buscar empleos y aplicar ofertas', async ({ page }) => {
  // ir a la pagina principal
  await page.goto("http://localhost:5173/");

  const searchInput = page.getByRole('searchbox');
  await searchInput.fill('React')

  await page.getByRole('button', { name: 'Buscar' }).click()
  
  const jobCards = page.locator('job-listing-card')
})