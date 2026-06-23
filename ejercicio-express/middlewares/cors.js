import cors from 'cors'

const ACCEPT_ORIGINS = ["http://localhost:5173", "http://localhost:9000"];

export const logMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  console.log("origin recibido:", req.headers.origin); 

  if (!origin && !ACCEPT_ORIGINS.includes(origin)) {
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
}

export const corsMiddleware = ({ accptedOrigins = ACCEPT_ORIGINS } = {}) => {
    return cors({
    // si la direccion eta invitada
    origin: (origin, callback) => {
      if ( ACCEPT_ORIGINS.includes(origin)) {
        return callback(null, true);
        // no hay error, que pase
      }
      // Si no dame este error
      console.log(`Origen: ${origin}`);

      return callback(new Error("Origen no permitido"));
    },
  })
}