// Componente reutilizable que muestra un switch para activar o desactivar estados
import {StatusSwitchFour} from "@/shared/";

// Componente que contiene los botones de acciones (editar y eliminar) para cada usuario
import ProductRowActions from "../components/ProductRowActions";

//se importa el useState para el contenerod de descripcion
import { useState } from "react";

const estadoMap = {
  0: "inactivo",
  1: "activo",
  2: "vencido",
  3: "agotado",
  4: "suspendido",
};

const estadoToNum = {
  "inactivo": 0,
  "activo": 1,
  "vencido": 2,
  "agotado": 3,
  "suspendido": 4,
};
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
    header: "via de administración", // Encabezado visible
  },

  // Columna requiresPrescription
  {
    accessorKey: "requiresPrescription",
    header: "Requiere Formula",
  },

  // Columna stock
  {
    accessorKey: "stock",
    header: "Stock ",
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
    header: "Forma farmaceutica",
  },
  //   Columna lotNumber
  {
    accessorKey: "lotNumber",
    header: "Lote",
  },
  //   Columna manufacturingDate
  {
    accessorKey: "manufacturingDate",
    header: "Fecha de fabricación",
  },
  //   Columna expiracion
  {
    accessorKey: "expirationDate",
    header: "Fecha de Expiración",
  },
  // DESCRIPCION
  /**
   * Se usa el estado de expanded se utiliza para que al escuchar el evento click
   * el contenedor cambia de tamaño  a un maximo de 400px
   * tambien se tiene una condicionalque dependiendo si tiene expancion o
   * no mostrar un mensaje de hover
   */

  {
    accessorKey: "description",
    header: "Descripción",
    cell: ({ row }) => {
      //Controla si la celda está expandida o contraída
      const [expanded, setExpanded] = useState(false);
      //Toma la descripción del producto de esa fila. Si viene null o undefined usa "" vacío.
      const text = row.original.description ?? "";

      return (
        <span
          //Cada vez el usuario hace click alterna enre true y false
          onClick={() => setExpanded(!expanded)}
          //Muestra un mensaje al hacer hover indicando qué va a pasar al hacer click.
          title={!expanded ? "Click para expandir" : "Click para contraer"}
          className={`block cursor-pointer ${
            expanded ? "max-w-100 whitespace-normal" : "max-w-50 truncate"
          }`}
        >
          {text}
        </span>
      );
    },
  },

  // Columna Estado (activo / inactivo)
  {
    accessorKey: "status",
    header: "Estado",

    cell: ({ row }) => {
      const product = row.original;

      const handleChange = async (value) => {
        const nuevoEstado = estadoMap[value];

        await fetch(`http://localhost:8000/api/medicamentos/${product.id}/`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estado_medicamento: nuevoEstado }),
        });
      };

      return (
        <StatusSwitchFour
          checked={estadoToNum[product.status] ?? 0}
          onChange={handleChange}
        />
      );
    },
  },

  // Columna de acciones (editar / eliminar)
  {
    id: "actions", // No usa accessorKey porque no corresponde a un campo del usuario

    // Renderiza el componente de acciones pasando el usuario completo
    cell: ({ row }) => <ProductRowActions product={row.original} />,
  },
];