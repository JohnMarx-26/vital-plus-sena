import { z } from "zod";

export const userSchema = z
  .object({
    documentType: z
      .string()
      .min(1, "Debe seleccionar un tipo de documento"),

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

    phone: z
      .string()
      .regex(/^[0-9]{10}$/, "El teléfono debe tener 10 dígitos"),

    documentNumber: z
      .string()
      .regex(/^[0-9]+$/, "El número de documento solo debe contener dígitos")
      .min(5, "Número de documento inválido")
      .max(20, "Número de documento demasiado largo"),

    city: z
      .string()
      .min(1, "Debe seleccionar una ciudad"),

    address: z
      .string()
      .min(5, "La dirección debe tener mínimo 5 caracteres")
      .max(120, "La dirección es demasiado larga"),

    password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),

    confirmPassword: z
      .string()
      .min(1, "Debe confirmar la contraseña"),

    avatarUrl: z
      .string()
      .nullable()
      .optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });