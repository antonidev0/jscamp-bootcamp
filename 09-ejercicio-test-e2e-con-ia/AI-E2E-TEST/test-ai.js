import { test } from 'node:test'
import assert from 'node:assert';

import { Stagehand } from '@browserbasehq/stagehand';
process.loadEnvFile();

test("Un usuario puede entrar a la JSConf y adquirir dos entradas por  €287.98", async () => {
    const stagehand = new Stagehand({
      env: "LOCAL",
      model: "openai/gpt-4o",
      apiKey: process.env.OPENAI_API_KEY,
    });

    await stagehand.init()
    const [page] = stagehand.content.page()

    await page.goto("https://jsconf.es");

      await stagehand.act("Haz clic en el botón de comprar entradas");
      await stagehand.act("Añade un ticket de entrada general al carrito");
      await stagehand.act("Añade otro ticket de entrada general al carrito");

      // Extracción de info para validar
      const subtotal = await stagehand.extract(
        "Extract the subtotal from the page",
      );

      assert.equal(subtotal, "287,98");

      await stagehand.close();
});