import { z } from "zod";

export const jobSchema = z.object({
  // titulo
  titulo: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" })
    .max(100, { message: "El título no puede exceder los 100 caracteres" }),
  
  // empresa
  empresa: z.string(),
  // ubicacion
  ubicacion: z.string(),

  // opcionales
  descripcion: z.string().optional(),
  content: z.any().optional(),

  // data con sus subcampos
  data: z.object({
    // array de strings (requerido)
    technology: z.array(z.string()),
    // opcional
    modalidad: z.string().optional(),
    // opcional
    nivel: z.string().optional(),
  }),
});

export const validateJob = (input) => {

    // safeparse me comprueuba si el input cumple con el esquema
  return jobSchema.safeParse(input);
};

export const validatePartialJob = (input) => {

    // .partial() toma el esquema original y crea una version
    //  nueva donde ninguno de los campos es obligatorio
  return jobSchema.partial().safeParse(input);
};