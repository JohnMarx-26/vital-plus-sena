// Contiene las acciones de cada fila
// Iconos usados en los botones de acciones
import { Newspaper, FileDown } from "lucide-react";

// Hook de React Router para navegar programáticamente entre rutas
import { useNavigate } from "react-router-dom";

// Componente que renderiza las acciones de cada fila de usuario
// Recibe como prop el objeto user
export default function SaleRowActions({ sale }) {

  // const handleEdit = () => {
  //   console.log("Editar usuario", user.id);
  // };

  // Hook que permite redirigir a otra ruta desde código
  const navigate = useNavigate();

  // Acción para editar el usuario
  // Redirige a la página de edición usando el id del usuario
  const handleEdit = () => {
    // navigate(`/sales/${sale.id}/edit`); 
    navigate("/ventas/detalles");
  };

  // Acción para eliminar el usuario
  // Actualmente solo imprime en consola el id
  // En una aplicación real aquí se llamaría a la API
  const handleDelete = () => {
    console.log("Eliminar usuario", sale.id);
  };

  return (
    // Contenedor de los botones de acciones
    <div className="flex gap-2">

      {/* Botón editar */}
      <button
        onClick={handleEdit} // Ejecuta la navegación a la página de edición
        className="p-1 rounded hover:bg-gray-100"
      >
        <Newspaper size={16} /> {/* Icono de editar */}
        
      </button>

      {/* Botón eliminar */}
      <button
        onClick={handleDelete} // Ejecuta la acción de eliminación
        className="p-1 rounded hover:bg-gray-100"
      >
        <FileDown size={16} /> {/* Icono de eliminar */}
      </button>

    </div>
  );
}


