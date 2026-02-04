<!-- Aquí puedes introducir tus dudas sobre el ejercicio, la consigna, la corrección, etc -->
Hola un saludo, tengo una duda, es que en el ejercicio hice

<!-- searchInput.addEventListener("input", () => { -->

Pero tammbien hay ejemplos como :

<!-- input.addEventListener("input", updateValue); -->

o tambien

<!-- form.addEventListener('submit', async e =>{ -->

Pero ¿como puedo saber cual evento debo usar o cual es el mas adecuado en cada caso? 
por ejemplo, cuando conviene mas usar el input y el submit y que evento conviene usar
Ademas, aunque tenga el archivo data.json de manera local, es mas correcto usar funcion asincrona?

Muchas gracias :D

---

## Respuesta

¡Hola! Excelentes preguntas. Te explico cada una:

### 1. ¿Cuándo usar `input` vs `submit`?

**Evento `input`**: Se dispara cada vez que el valor de un <input /> cambia (cuando presionamos una tecla, pegamos un texto, etc.)
- **Lo puedes usar cuando**: Necesites respuesta inmediata mientras el usuario escribe
- **Ejemplos comunes**:
  - Búsquedas en tiempo real (filtrar una lista mientras escribes)
  - Validación en tiempo real (mostrar si un email es válido mientras escribes)

```javascript
// Búsqueda en tiempo real
searchInput.addEventListener("input", () => {
  const query = searchInput.value;
  filtrarResultados(query); // Se ejecuta con cada tecla
});
```

**Evento `submit`**: Se dispara cuando se envía un formulario (botón submit o  `Enter`)
- **Lo puedes usar cuando**: Necesites procesar todos los datos del formulario juntos
- **Ejemplos comunes**:
  - Enviar formularios html <form />

```javascript
// Enviar formulario completo
form.addEventListener('submit', async (e) => {
  e.preventDefault(); // ¡Importante! Evita recargar la página
  const formData = new FormData(form);
  await enviarDatos(formData);
});
```

**Regla general**: 
- `input` → Interacción con <input />
- `submit` → Interacción con <form />

### 2. ¿Función inline vs función separada?

Ambas formas son correctas, depende del contexto:

```javascript
// Opción 1: Función inline (anónima)
input.addEventListener("input", () => {
  console.log("Escribiendo...");
});

// Opción 2: Función separada (nombrada)
function updateValue() {
  console.log("Escribiendo...");
}
input.addEventListener("input", updateValue);
```

**Usa función inline cuando**:
- La lógica es corta y específica para ese evento
- No necesitas reutilizar la función
- Solo se usa en un lugar

**Usa función separada cuando**:
- La lógica es compleja o larga (difícil de leer)
- Necesitas reutilizar la función en varios lugares
- Quieres que el código sea se lea mejor

### 3. ¿Async con archivos locales?

**Sí, es correcto usar `async/await` incluso con archivos locales**. Esto lo hacemos por mantenibilidad del código. Aunque lo que se haga es síncrono, si sabemos que en un futuro puede ser asíncrono, es mejor hacerlo async.

Por ejemplo cuando queremos obtener datos de algún lugar externo. En este caso lo hacemos de un archivo local, pero estas acciones por lo general se hacen con una API externa, por lo que tiene sentido que usemos async/await.

**Importante:** No significa que tengas que hacer todo async, solo cuando sea necesario o sientas que en el futuro puede ser asíncrono. En el módulo de Node.js se verá un ejemplo de esto, así que no te preocupes.

---

Si quedan dudas me puedes escribir!