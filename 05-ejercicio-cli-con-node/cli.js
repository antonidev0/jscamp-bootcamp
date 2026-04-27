import { stat } from "node:fs/promises";  // Para obtener información/metadatos de un archivo

import { readdir } from "node:fs/promises"; // Para leer el contenido de un directorio

import path from "node:path";  // Para manipular rutas de archivos de forma segura


// El argumento 2 es nuestra carpeta, si no existe usamos '.'
const folder = process.argv[2] ?? ".";

let files;
try {
  files = await readdir(folder); 
  
} catch {
  console.error(`❌ No se pudo leer el directorio: ${folder}`);
  process.exit(1);
}

const filePromises = files.map(async (file) => {

  // consigue en base a las rutas los archivos y carpetas de la misma
  const filePath = path.join(folder, file); 
  // consigueme los metadatos de filePath
  const stats = await stat(filePath); 
  
  // consigue los directorios
  const isDirectory = stats.isDirectory();

  // si es dame la primera imagen si la imagen 
  const fileType = isDirectory ? "📁" : "📄";

  // dame el tamaño en bytes como string
  const fileSize = stats.size.toString();

  // dame la ultima fecha de modificacion del archivo
  const fileModified = stats.mtime.toLocaleString();

  
  return `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)}KB ${fileModified.padEnd(10)}`;
});

const filesInfo = await Promise.all(filePromises);
filesInfo.forEach((line) => console.log(line));
