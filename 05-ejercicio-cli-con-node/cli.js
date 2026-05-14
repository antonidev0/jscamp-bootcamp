import { stat } from "node:fs/promises";  // Para obtener información/metadatos de un archivo

import { readdir } from "node:fs/promises"; // Para leer el contenido de un directorio

import path from "node:path";  // Para manipular rutas de archivos de forma segura

// Separame los argumentos de los flags
const args = process.argv.slice(2);

// dame los flags
const flags = args.filter((arg) => arg.startsWith("--"));

// dame los argumentos
const positional = args.find((arg) => !arg.startsWith("--")); 

// El argumento 2 es nuestra carpeta, si no existe usamos '.'
const folder = positional ?? ".";

const onlyFiles = flags.includes("--files");
const onlyFolders = flags.includes("--folders");
const ordenAsc = flags.includes("--asc");
const ordenDesc = flags.includes("--desc");

const folderAbsolute = path.resolve(folder);

if (!process.permission?.has("fs.read", folderAbsolute)) {
  console.error(`❌ Error: No tenemos permiso para leer ${folderAbsolute}`);
  console.error(
    `Ejecuta de nuevo con:\n   node --permission --allow-fs-read=${folderAbsolute} cli.js ${folder}`
  );
  process.exit(1);
}


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

  return {
    name: file,
    isDirectory,
    line: `${fileType} ${file.padEnd(20)} ${fileSize.padStart(10)}KB ${fileModified.padEnd(10)}`,
  }
});

let filesInfo = await Promise.all(filePromises);

const isOnlyFiles = onlyFiles && !onlyFolders;
const isOnlyFolders = onlyFolders && !onlyFiles;

filesInfo = isOnlyFiles
  ? filesInfo.filter((info) => !info.isDirectory)
  : filesInfo;
filesInfo = isOnlyFolders
  ? filesInfo.filter((info) => info.isDirectory)
  : filesInfo;

filesInfo = ordenAsc
  ? filesInfo.sort((a, b) => a.name.localeCompare(b.name))
  : filesInfo;
filesInfo = ordenDesc
  ? filesInfo.sort((a, b) => b.name.localeCompare(a.name))
  : filesInfo;
  

filesInfo.forEach((info) => console.log(info.line));
