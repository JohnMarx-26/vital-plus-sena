import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Debe ingresar un correo válido"),

  password: z
    .string()
    .min(1, "La contraseña es obligatoria"),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Debe ingresar un correo válido"),
});

export const resetTokenSchema = z.object({
  token: z
    .string()
    .min(1, "El token es obligatorio")
    .min(4, "El token es demasiado corto"),
});

export const newPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "La contraseña debe tener mínimo 8 caracteres")
      .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
      .regex(/[a-z]/, "Debe contener al menos una minúscula")
      .regex(/[0-9]/, "Debe contener al menos un número"),

    confirmPassword: z
      .string()
      .min(1, "Debe confirmar la contraseña"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });