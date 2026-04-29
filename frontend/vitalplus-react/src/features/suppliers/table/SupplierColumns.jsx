// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import SupplierRowActions from "../components/SupplierRowActions";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const SupplierColumns = [ 
  // Columna ID
  {
    accessorKey: "id", // Propiedad del objeto supplier que se mostrará en la columna
    header: "ID", // Título de la columna
  },

   // Columna NIT
  {
    accessorKey: "nit", 
    header: "NIT", 
  },
  
  // Columna Nombre proveedor
  {
    accessorKey: "name", // Campo del objeto Supplier
    header: "Nombre", // Encabezado visible
  },

   // Columna Razon Social
  {
    accessorKey: "razon_social", 
    header: "Razón social", 
  },

  // Columna Nombre Contacto
  {
    accessorKey: "contact",
    header: "Nombre Contacto",
  },

  // Columna Telefono
  {
    accessorKey: "phone",
    header: "Telefono",
  },

  // Columna Correo Electronico
   {
    accessorKey: "email",
    header: "Correo Electronico",
  },

   // Columna ciudad
   {
    accessorKey: "city",
    header: "Ciudad",
  },

   // Columna Adress
   {
    accessorKey: "address",
    header: "Direccion",
  },

  // Columna Estado (activo / inactivo)
  {
    accessorKey: "is_active",
    header: "Estado",

    // Render personalizado de la celda
    // Permite mostrar un componente en lugar de solo texto
    cell: ({ row }) => {
      // Se obtiene el objeto completo del usuario de la fila
      const supplier = row.original;

      // Función que se ejecuta cuando cambia el switch
      const handleChange = (value) => {
        // value representa el nuevo estado del switch (true o false)
        console.log("Actualizar estado usuario:", supplier.supplier.id, value);

        // Aquí normalmente se llamaría una API para actualizar el estado
        // updateSupplierStatus(supplier.supplier_id, value)
      };

      return (
        // Componente reutilizable para mostrar el switch
        <StatusSwitch
          checked={supplier.is_active} // Estado actual del usuario
          onChange={handleChange} // Función que maneja el cambio
        />
      );
    },
  },

  // Columna de acciones (editar / eliminar)
  {
    id: "actions", // No usa accessorKey porque no corresponde a un campo del usuario

    // Renderiza el componente de acciones pasando el usuario completo
    cell: ({ row }) => <SupplierRowActions supplier={row.original} />,
  },
];
