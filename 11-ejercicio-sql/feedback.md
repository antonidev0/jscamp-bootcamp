<!-- Aquí irá el feedback del ejercicio -->
Hola! Muy bien resuelto el ejercicio!

Hicimos algunos cambios de TypeScript, para mejorar los types y hacer que la experiencia de desarrollo (DX) sea mejor.

Por otro lado, actualizamos en `tsconfig.json` el `module` a `ESNext` para que el compilador pueda usar `with { type: "json" }` en el archivo `seed.ts` y no de errores de compilación.

Agregamos el script `"seed": "tsx db/seed.ts"` en `package.json`, que faltaba para simplificar el comando `npm run seed` y manejarlo desde scripts.

Hicimos el seed idempotente: antes de insertar se vacían las tablas dentro de la transacción, así se puede ejecutar `npm run seed` varias veces sin fallar por claves duplicadas.

Cambiamos la lógica de `update`: ahora usa un `UPDATE` real sobre las columnas del job y reemplaza tecnologías y contenido dentro de una transacción, en lugar de borrar y reinsertar el job completo.

Corregimos un detalle en el filtro por tecnología: el README dice `?technology=react`, pero el controller leía `tech`, así que el filtro se ignoraba. Ahora acepta ambos (hemos tenido problemas en algunos ejercicios por inconsistencia entre el README y el controller, así que decidimos dejar los dos).

Son muchos pequeños cambios, pero si tienes alguna duda nos la puedes comentar! Tenemos el archivo `dudas.md` para eso, y en caso contrario, a seguir avanzando! Lo estas haciendo muy bien y queda poco :)