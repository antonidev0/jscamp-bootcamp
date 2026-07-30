Muy buen trabajo!

Quería dejarte algunas recomendaciones por aquí:

1. Siempre evita usar `locator`, en su lugar, usa `getByRole`, `getByText`, `getByLabel`, etc...

Por ejemplo, cuando haces:

```js
const jobTitle = page.locator("h1");
```

Podrías utilizar:

```js
const jobTitle = page.getByRole('heading', {
  level: 1,
  name: /el-nombre-del-titulo/gi // Es un parametro opcional
})
```

---

Así como localizar elementos por `id` o por `css`, siempre tenemos que evitar esto, a las muy malas, que sea por medio de un `data-testid`.