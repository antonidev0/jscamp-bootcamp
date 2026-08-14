/* Aquí irá tu código del primer ejercicio */

// Tarea 1
// 1. Importar `Database` de `better-sqlite3` (verás que ya está definido en `package.json`)
import betterSqlite3 from "better-sqlite3";

// creo el archivo de base de datos
export const db = betterSqlite3("jobs.db");

// el modo WAL mejora el rendimiento con lecturas y escrituras simultaneas
// activo modo WAL para mejorar la concurrencia
db.pragma("journal_mode = WAL");

// activo foreign key para que las claves foráneas funcionen correctamente
db.pragma("foreign_keys = ON");
