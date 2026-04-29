import { z } from "zod";

export const productShippingSchemas = z
  .object({
    
    department: z
    .string()
    .min(4, "Nombre de departamento válido")
    .max(30, "El Departamento es demasiado largo"),


  town: z
    .string()
    .min(3, "El municipio debe tener mínimo 3 caracteres")
    .max(50, "El municipio es demasiado largo"),


  address: z
    .string()
    .min(5, "Ingresa una dirección válida")
    .max(80, "La dirección es demasiado larga")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s#\-\.]+$/,
      "La dirección solo puede contener letras, números, #, - y ."
    ),

  complement: z
    .string()
    .max(100, "Máximo 100 caracteres")
    .optional()
    .or(z.literal("")),

  neighborhood: z
    .string()
    .max(60, "El barrio es demasiado largo")
    .optional()
    .or(z.literal("")),

  addressee: z
    .string()
    .min(3, "El destinatario debe tener mínimo 3 caracteres")
    .max(80, "El nombre es demasiado largo")
    .regex(
      /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      "El destinatario solo puede contener letras"
    ),

});

