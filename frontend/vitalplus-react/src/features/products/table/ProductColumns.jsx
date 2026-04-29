// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import ProductRowActions from "../components/ProductRowActions";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const ProductColumns = [
  // Columna ID
  {
    accessorKey: "id", // Propiedad del objeto supplier que se mostrará en la columna
    header: "ID", // Título de la columna
  },

   // Columna productName
  {
    accessorKey: "productName", 
    header: "Nombre producto", 
  },
  
  // Columna administrationRoute
  {
    accessorKey: "administrationRoute", 
    header: "Ruta de administración", // Encabezado visible
  },

   // Columna requiresPrescription
  {
    accessorKey: "requiresPrescription", 
    header: "Requiere Formula", 
  },
   // Columna concentration

  {
    accessorKey: "concentration", 
    header: "Concentración", 
  },
   // Columna requiresPrescription

  {
    accessorKey: "laboratory", 
    header: "Laboratorio", 
  },
   // Columna requiresPrescription

  {
    accessorKey: "provider", 
    header: "Proveedor", 
  },

  // Columna stock
  {
    accessorKey: "stock",
    header: "Numero de stock ",
  },

  // Columna purchasePrice
  {
    accessorKey: "purchasePrice",
    header: "Precio de compra",
  },

  // Columna salePrice
   {
    accessorKey: "salePrice",
    header: "Precio de venta",
  },

   // Columna pharmaceuticalForm
   {
    accessorKey: "pharmaceuticalForm",
    header: "Formula farmaceutica",
  },
//   Columna lotNumber
   {
    accessorKey: "lotNumber",
    header: "Numero de lote",
  },
//   Columna manufacturingDate
   {
    accessorKey: "manufacturingDate",
    header: "Fecha de fabricación",
  },
//   Columna expiracion
   {
    accessorKey: "expirationDate",
    header: "Fecha de Expiracion",
  },
//   Columna description
   {
    accessorKey: "description",
    header: "Descripción",
  },

  // Columna Estado (activo / inactivo)
  {
    accessorKey: "is_active",
    header: "Estado",

    // Render personalizado de la celda
    // Permite mostrar un componente en lugar de solo texto
    cell: ({ row }) => {
      // Se obtiene el objeto completo del usuario de la fila
      const user = row.original;

      // Función que se ejecuta cuando cambia el switch
      const handleChange = (value) => {
        // value representa el nuevo estado del switch (true o false)
        console.log("Actualizar estado usuario:", user.user.id, value);

        // Aquí normalmente se llamaría una API para actualizar el estado
        // updateUserStatus(user.user_id, value)
      };

      return (
        // Componente reutilizable para mostrar el switch
        <StatusSwitch
          checked={user.is_active} // Estado actual del usuario
          onChange={handleChange} // Función que maneja el cambio
        />
      );
    },
  },

  // Columna de acciones (editar / eliminar)
  {
    id: "actions", // No usa accessorKey porque no corresponde a un campo del usuario

    // Renderiza el componente de acciones pasando el usuario completo
    cell: ({ row }) => <ProductRowActions user={row.original} />,
  },
];
