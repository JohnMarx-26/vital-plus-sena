import { z } from "zod";

export const getProductSchema = (isMedicamento) =>
  z.object({
    id: z.union([z.string(), z.number()]).optional(),

    expirationDate: z.string().min(6, "Fecha de expiración obligatoria"),
    manufacturingDate: z.string().min(6, "Fecha de fabricación obligatoria"),

    productName: z
      .string()
      .min(3, "Mínimo 3 caracteres")
      .max(60, "Nombre demasiado largo"),

    requiresPrescription: z.enum(['Si', 'No']).default('No'),

    lab: z.string().min(1, "El laboratorio es obligatorio"),
    supplier: z.string().min(1, "El proveedor es obligatorio"),

    stock: z
      .union([z.string(), z.number()])
      .refine((val) => String(val).length <= 3, "Máximo 3 caracteres")
      .refine((val) => !isNaN(Number(val)), "Debe ser numérico"),

    purchasePrice: z
      .union([z.string(), z.number()])
      .refine((val) => !isNaN(Number(val)), "Debe ser decimal"),

    salePrice: z
      .union([z.string(), z.number()])
      .refine((val) => !isNaN(Number(val)), "Debe ser decimal"),

    discount: z.union([z.string(), z.number()]).optional().default("0"),
    salePriceDiscount: z.union([z.string(), z.number()]).optional(),

    lotNumber: z
      .union([z.string(), z.number()])
      .refine((val) => String(val).length >= 4, "Mínimo 4 caracteres")
      .refine((val) => String(val).length <= 10, "Máximo 10 caracteres"),

    description: z
      .string()
      .min(10, "Mínimo 10 caracteres")
      .max(255, "Máximo 255 caracteres"),

    avatarUrl: z.string().nullable().optional(),

    // ===== Campos exclusivos Medicamento =====
    pharmaceuticalForm: isMedicamento
      ? z.string().min(1, "La forma farmacéutica es obligatoria")
      : z.string().optional(),

    presentation: isMedicamento
      ? z.string().min(1, "La presentación es obligatoria")
      : z.string().optional(),

    administrationRoute: isMedicamento
      ? z.string().min(1, "La vía de administración es obligatoria")
      : z.string().optional(),

    concentration: isMedicamento
      ? z.string().min(1, "La concentración es obligatoria")
          .refine((val) => val.trim().length > 0, {
            message: "Debe contener al menos un carácter válido"
          })
      : z.string().optional(),

    // ===== Campo exclusivo Producto =====
    category: !isMedicamento
      ? z.string().min(1, "La categoría es obligatoria")
      : z.string().optional(),
  });