import { z } from "zod";

export const jobSchema = z.object({
  title: z
    .string()
    .min(3, { message: "El título debe tener al menos 3 caracteres" })
    .max(100, { message: "El título no puede exceder los 100 caracteres" }),

  company: z.string(),
  location: z.string(),

  // opcional: no obligamos a que venga siempre
  description: z.string().optional(),

  data: z.object({
    technology: z.array(z.string()),
    modality: z.string(),
    level: z.string(),
  }),
});

export const validateJob = (input) => {
  return jobSchema.safeParse(input);
};

export const validatePartialJob = (input) => {
  return jobSchema.partial().safeParse(input);
};