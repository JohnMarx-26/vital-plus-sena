import { z } from "zod";

export const supplierSchema = z.object({

    suppliertName: z
        .string()
        .min(3, "Los nombres deben tener mínimo 3 caracteres")
        .max(60, "Los nombres son demasiado largos"),
    
    documentNumber: z
      .string()
      .min(9, "Número de documento inválido")
      .max(20, "Número de documento demasiado largo"),
    
    companyName: z
        .string()
        .min(5, "Los nombres deben tener mínimo 3 caracteres")
        .max(60, "Los nombres son demasiado largos"),
    
    contactName: z
        .string()
        .min(3, "Los nombres deben tener mínimo 3 caracteres")
        .max(60, "Los nombres son demasiado largos"),

    lastName: z
        .string()
        .min(3, "Los apellidos deben tener mínimo 3 caracteres")
        .max(60, "Los apellidos son demasiado largos"),

    phone: z
        .string()
        .regex(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos"),

    city: z
        .string()
        .min(5, "La ciudad debe tener mínimo 5 caracteres")
        .max(30, "El nombre es demasiado larga"),

    email: z
        .string()
        .email("Debe ingresar un correo válido"),
    
    address: z
        .string()
        .min(5, "La dirección debe tener mínimo 5 caracteres")
        .max(120, "La dirección es demasiado larga"),

    avatarUrl: z
        .string()
        .nullable()
        .optional(),
  });