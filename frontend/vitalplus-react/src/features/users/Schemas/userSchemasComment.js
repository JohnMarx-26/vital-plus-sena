import { z } from "zod";

export const userSchemasComment = z
  .object({
    
    firstName: z
      .string()
      .min(3, "Los nombres deben tener mínimo 3 caracteres")
      .max(60, "Los nombres son demasiado largos"),

    lastName: z
      .string()
      .min(3, "Los apellidos deben tener mínimo 3 caracteres")
      .max(60, "Los apellidos son demasiado largos"),

    email: z
      .string()
      .email("Debe ingresar un correo válido"),

    comment: z
      .string()
      .min(4, "minimo 4 caracteres")
      .max(255, "maximo 255 caracteres"),

  });