// Componente reutilizable que muestra un switch para activar o desactivar estados
import StatusSwitch from "@/shared/components/StatusSwitch";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import UserRowActions from "../components/UserRowActions";

// Definición de las columnas de la tabla de usuarios
// Este arreglo suele usarse en librerías de tablas como TanStack Table
export const UserColumns = [
  // Columna ID
  {
    accessorKey: "id",
    header: "ID",
  },

  // Columna Nombre
  {
    accessorKey: "name",
    header: "Nombre",
  },

  // Columna Apellido
  {
    accessorKey: "lastName",
    header: "Apellido",
  },

  // Columna Rol
  {
<<<<<<< HEAD
    accessorKey: "documentType", 
    header: "Tipo de documento",  
=======
    accessorKey: "role",
    header: "Rol",
>>>>>>> origin/SNEIDER-PROVEEDORES
  },

  // Columna Tipo de documento
  {
    accessorKey: "documentType",
    header: "Tipo de documento",
  },

  // Columna Número de documento
  {
    accessorKey: "documentNumber",
    header: "Numero de documento",
  },

  // Columna Email
  {
    accessorKey: "email",
    header: "Email",
  },

  // Columna Dirección
  {
    accessorKey: "address",
    header: "Dirección",
  },

  // Columna Ciudad
  {
    accessorKey: "city",
    header: "Ciudad",
  },

  // Columna Número de celular
  {
    accessorKey: "cellNumber",
    header: "Numero de celular",
  },

  // Columna Estado
  {
    accessorKey: "is_active",
    header: "Estado",

    // Render personalizado de la celda
    cell: ({ row }) => {
      // Se obtiene el objeto completo del usuario de la fila
      const user = row.original;

      // Función que se ejecuta cuando cambia el switch
      const handleChange = (value) => {
        console.log("Actualizar estado usuario:", user.id, value);
      };

      return (
        <StatusSwitch
          checked={user.is_active}
          onChange={handleChange}
        />
      );
    },
  },

  // Columna de acciones
  {
    id: "actions",
    cell: ({ row }) => <UserRowActions user={row.original} />,
  },
];