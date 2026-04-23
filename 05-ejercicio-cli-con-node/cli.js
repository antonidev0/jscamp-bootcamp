// readdir: lee el contenido de una carpeta
// stat: me obtiene la informacion de los archivos
import { readdir, stat } from "node:fs/promises";

// join: une partes de una ruta de forma segura (ej: "./src" + "index.js" = "./src/index.js")
import { join } from "node:path";
  

const dir = process.argv[2] ?? ".";

const args = process.argv.slice(2);
const flags = args.filter((arg) => arg.startsWith("--"));
const nonFlags = args.filter((arg) => !arg.startsWith("--"));

const showOnlyFiles = flags.includes("--files");
const showOnlyFolders = flags.includes("--folders");
const sortAsc = flags.includes("--asc");

function formatSize(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

// const formaBytes = (size) => {
//   if (size <= 1024) return `${size} B`;
//   return `${(size / 1024).toFixed(2)} KB`;
// };

// nombres sin info
const files = await readdir(dir); 

// recuperar la info de cada file
const entries = await Promise.all(
    files.map(async (name) => {
        const fullPath = join(dir, name)
        const info = await stat(fullPath)

        return {
          name, 
          isDir: info.isDirectory(),
          size: formatSize(info.size),
          modified: info.mtime,
        };
    })

)

// Filtrar
let filtered = entries;
if (showOnlyFiles && !showOnlyFolders) {
  filtered = entries.filter((e) => !e.isDir);
} else if (showOnlyFolders && !showOnlyFiles) {
  filtered = entries.filter((e) => e.isDir);
}

// Ordenar
if (sortAsc) {
  filtered.sort((a, b) => a.name.localeCompare(b.name));
}



for (const entry of entries) {
    const icon = entry.isDir ? "📁" : "📄";
    const size = entry.isDir ? '-' : `${entry.size}`
    const fileModified = info.mtime.toLocaleString();

    console.log(`${icon}     ${entry.name}  ${size} --- ${fileModified}`);

}

// const filePromises = files.map(async (file) => {
//   const filePath = path.join(folder, file);
//   const stats = await stat(filePath);

//   const isDirectory = stats.isDirectory();
//   const fileType = isDirectory ? "📁" : "📄";
//   const fileSize = stats.size.toString();
//   const fileModified = stats.mtime.toLocaleString();

//   return `${fileType} ${file.padEnd(20)} ${formatSize(fileSize).padStart(10)} ${fileModified}`;
// });

// const filesInfo = await Promise.all(filePromises);
// filesInfo.forEach((line) => console.log(line));