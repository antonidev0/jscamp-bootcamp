import { validateJob, validatePartialJob } from "../schemas/jobs.js"; 

// middleware para validar un job COMPLETO (POST y PUT)
export const validateJobMiddleware = (req, res, next) => {
  const result = validateJob(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Datos invalidos",
      errors: result.error.format(),
    });
  }

  // reemplazo el body por los datos ya validados (limpios)
  req.body = result.data;

  // datos validos, dejo pasar al controller
  next();
};

// middleware para validar un job PARCIAL (PATCH)
export const validatePartialJobMiddleware = (req, res, next) => {
  const result = validatePartialJob(req.body);

  if (!result.success) {
    return res.status(400).json({
      message: "Datos invalidos",

      // .format para format organiza los errores de forma anidada
      // puedieda usar .flutten() pero no se cual seria mas adecuado
      errors: result.error.format(),
    });
  }

  req.body = result.data;

  next();
};
