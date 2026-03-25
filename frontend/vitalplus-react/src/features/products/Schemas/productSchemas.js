import { z } from "zod";

export const productSchema = z
  .object({
      id: z
      .string()
      .min(1, "El ID debe tener como minimo un caracter"),

      expirationDate: z
      .string()
      .min(6, "Fecha de Expiracion debe tener como minimo 6 caracteres"),

      manufacturingDate: z
      .string()
      .min(6, "Fecha de vencimiento debe tener como minimo un caracter"),

    productName: z
      .string()
      .min(3, "Los nombres deben tener mínimo 3 caracteres")
      .max(60, "Los nombres son demasiado largos"),

    administrationRoute: z
      .string()
      .min(3, "Los rutas de administración deben tener mínimo 3 caracteres")
      .max(60, "La ruta de administración es demasiado larga"),

    requiresPrescription: z
      .string()
      .min(2, "Requiere minimo 2 caracteres")
      .max(2, "Requiere maximo 2 caracteres"),

    stock: z
      .string()
      .min(1, "Requiere minimo 1 caracter")
      .max(3, "Requiere maximo 3 caracteres"),

    purchasePrice: z
      .string()
      .min(3, "El precio de compra requiere minimo 3 caracteres")
      .max(60, "El precio de compra maximo es de 60 caracteres"),

    salePrice: z
      .string()
      .min(3, "El precio de venta requiere minimo 3 caracteres")
      .max(60, "El precio de venta maximo es de 60 caracteres"),

    pharmaceuticalForm: z
      .string()
      .min(3, "La formula farmaceutica debe tener un minimo de 3 caracteres")
      .max(60, "La formula farmaceutica es demasiado larga"),

    lotNumber: z
      .string()
      .min(8, "El numero de lote debe tener un minimo de 8 caracteres")
      .max(10, "El numero de lote debe tener un maximo de 10 caracteres"),

    description: z
      .string()
      .min(10, "La descripcion debe tener un minimo de 10 caracteres")
      .max(100, "La descripcion es demasiado larga, maximo de 100 caracteres"),

    avatarUrl: z
      .string()
      .nullable()
      .optional(),

  })
