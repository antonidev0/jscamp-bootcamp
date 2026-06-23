import express from "express";
import jobs from "./jobs.json" with { type: "json" };
import { DEAFAULTS } from "./config.js";
import cors from 'cors'

process.loadEnvFile();
const PORT_SERVER = process.env.PORT ?? 1234;
console.log(PORT_SERVER);

const app = express();

const ACCEPT_ORIGINS = [ 
  'http://localhost:5173',
  "http://localhost:9000",
]
 
app.use((req, res, next) => {
  if (!ACCEPT_ORIGINS.includes(req.headers.origin)) {
    console.log("direccion no invitada detectada:");
    console.log({ 
      // de donde viene
      origin: req.headers.origin,

      // su direccion IP
      ip: req.ip,

      // que metodo quiso hacer
      metodo: req.method,

      // a donde queria ir
      ruta: req.originalUrl,

      // que navegador usa
      navegador: req.headers["user-agent"], 

      
      fecha: new Date(),
    });
  }
  next(); 
});

app.use(cors({
  // si la direccion eta invitada
  origin: (origin, callback) => {
    if (!origin || ACCEPT_ORIGINS.includes(origin)) {
      return callback(null, true)
      // no hay error, que pase
    }
    // Si no dame este error
    console.log(`Origen: ${origin}`);
    
    return callback(new Error('Origen no permitido'))
  }
}));

app.use(express.json())

app.listen(PORT_SERVER, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT_SERVER}`);
});
