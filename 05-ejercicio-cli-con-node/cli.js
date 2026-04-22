import { readdir, stat } from 'node:fs/promises'
import { join } from 'node:path'

// Aquí irá el código
// Recuperar la carpeta a lisar
const dir = process.argv[2] ?? '.'
console.log(process.argv , "aaaaaaaaaa");


// 2222

const formaBytes = (size) => {
    if (size <= 1024) return `${size} B` 
    return `${(size / 1024).toFixed(2)} KB`
  }

// nombres sin info 
const files = await readdir(dir)
console.log(files);

// recuperar la info de cada file
const entries = await Promise.all(
    files.map(async (name) => {
        const fullPath = join(dir, name)
        const info = await stat(fullPath)
    
        return {
            name,
            isDir: info.isDirectory(),
            size: formaBytes(info.size)
        }
    })

)

for (const entry of entries) {
    const icon = entry.isDir ? "📁" : "📄";
    const size = entry.isDir ? '-' : `${entry.size}`
    console.log(`${icon}     ${entry.name}  ${size}`);
    
}
