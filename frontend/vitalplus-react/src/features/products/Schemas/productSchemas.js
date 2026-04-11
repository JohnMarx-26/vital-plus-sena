import { z } from "zod";

export const getProductSchema = (isMedicamento) =>
  z.object({
    id: z.number().min(1, "El ID debe tener como mínimo un carácter"),

    expirationDate: z
      .string()
      .min(6, "Fecha de expiración debe tener como mínimo 6 caracteres"),

    manufacturingDate: z
      .string()
      .min(6, "Fecha de fabricación debe tener como mínimo 6 caracteres"),

    productName: z
      .string()
      .min(3, "Los nombres deben tener mínimo 3 caracteres")
      .max(60, "Los nombres son demasiado largos"),

    requiresPrescription: z.boolean().default(false),

    lab: z.string().min(1, "El laboratorio es obligatorio"),

    supplier: z.string().min(1, "El proveedor es obligatorio"),

    stock: z
      .string()
      .min(1, "Requiere mínimo 1 carácter")
      .max(3, "Requiere máximo 3 caracteres"),

    purchasePrice: z
      .string()
      .min(3, "El precio de compra requiere mínimo 3 caracteres")
      .max(60, "El precio de compra máximo es de 60 caracteres"),

    salePrice: z
      .string()
      .min(3, "El precio de venta requiere mínimo 3 caracteres")
      .max(60, "El precio de venta máximo es de 60 caracteres"),

    discount: z.string().optional().default("0"),

    salePriceDiscount: z.string().optional(),

    lotNumber: z
      .string()
      .min(4, "El número de lote debe tener mínimo 4 caracteres")
      .max(10, "El número de lote debe tener máximo 10 caracteres"),

    description: z
      .string()
      .min(10, "La descripción debe tener mínimo 10 caracteres")
      .max(255, "La descripción no puede superar los 255 caracteres"),

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
      ? z
          .string()
          .min(1, "La concentración es obligatoria")
          .refine(
            (val) => val.trim().length > 0,
            { message: "Debe contener al menos una letra, número o carácter especial" }
          )
      : z.string().optional(),

    // ===== Campo exclusivo Producto =====
    category: !isMedicamento
      ? z.string().min(1, "La categoría es obligatoria")
      : z.string().optional(),
  });