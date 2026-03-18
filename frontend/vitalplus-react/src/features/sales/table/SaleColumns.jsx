
// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import SaleRowActions from "../components/SaleRowActions";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const SaleColumns = [
  // Columna ID
  {
    accessorKey: "id", // Propiedad del objeto supplier que se mostrará en la columna
    header: "ID", // Título de la columna
  },

   // Columna Numero de Factura
  {
    accessorKey: "numero_factura", 
    header: "N° Factura", 
  },
  
  // Columna Fecha y hora de la venta
  {
    accessorKey: "fecha_venta", // Campo del objeto Supplier
    header: "Fecha venta", // Encabezado visible
  },

   // Columna Identificacion Cliente
  {
    accessorKey: "identificacion", 
    header: "Identificacion", 
  },

   // Columna Nombre Cliente
  {
    accessorKey: "cliente", 
    header: "Cliente", 
  },

  // Columna Nombre Vendedor
  {
    accessorKey: "vendedor",
    header: "Vendedor",
  },

  // Columna Subtotal
  {
    accessorKey: "subtotal",
    header: "Subtotal ",
  },

  // Columna IVA
   {
    accessorKey: "iva",
    header: "IVA ",
  },

   // Columna Descuento
   {
    accessorKey: "descuento",
    header: "Descuento ",
  },

   // Columna Total
   {
    accessorKey: "total",
    header: "Total ",
  },

  // Columna Metodo de Pago
  {
    accessorKey: "metodo_pago",
    header: "Metodo Pago",
  },

  // Columna Cantidad de productos
  {
    accessorKey: "n_items",
    header: "N° de Items",
  },
  // Columna estado
  {
    accessorKey: "estado",
    header: "Estado",
  },

  // Columna de acciones (editar / eliminar)
  {
    id: "actions", // No usa accessorKey porque no corresponde a un campo del usuario

    // Renderiza el componente de acciones pasando el usuario completo
    cell: ({ row }) => <SaleRowActions sale={row.original} />,
  },
];
