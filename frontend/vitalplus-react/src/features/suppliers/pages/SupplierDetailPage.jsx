import { SupplierDetailForm } from "@/features/suppliers";
import { Button, FormLayout } from "@/shared/";
import { useNavigate, useParams } from "react-router-dom";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import { useEffect, useState } from "react";
import { getSupplierById } from "../services/suppliersService";

/*se crea una arrow function para el boton del formulario
    a esta funcion se le realiza un callback cuando se ejecuta
    el FormLayout, dentro de esta funcion esta la logica de los botones
    y sus estilos*/

const Botones = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between px-10">
      <div>
        {/* Boton Retroceder */}
        <Button
          variant="secondary"
          size="sm"
          type="button"
          //para devolverme al apartado anterior
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <img src={retroceder} alt="icono-retroceder" className="w-5 h-5" />
          Retroceder
        </Button>
      </div>
    </div>
  );
};

export default function SupplierDetailPage() {
  // Obtiene el id que viene en la URL
  const { id } = useParams();

  // Estado donde se guardará el proveedor ya formateado
  const [supplier, setSupplier] = useState(null);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado para manejar errores
  const [error, setError] = useState("");

  useEffect(() => {
    // Función para consultar el proveedor al backend
    const loadSupplier = async () => {
      try {
        setLoading(true);
        setError("");

        // Llamado al endpoint detalle
        const data = await getSupplierById(id);

        // Se adapta la respuesta del backend al formato que usará el formulario
        const formattedSupplier = {
          id: data.id_proveedor,
          fullName: data.nombre_proveedor,
          documentType: data.tipo_documento,
          documentNumber: data.n_documento ?? "",
          razon_social: data.razon_social,
          userType: "Proveedor",
          contactName: `${data.nombres_contacto || ""} ${data.apellidos_contacto || ""}`.trim(),
          city: data.ciudad,
          email: data.correo_electronico,
          phone: data.telefono_contacto,
          address: `${data.direccion}, ${data.ciudad}`,
          createdAt: "No disponible",
          status: data.estado,
        };

        setSupplier(formattedSupplier);
      } catch (err) {
        setError(err.message || "No se pudo cargar el proveedor");
      } finally {
        setLoading(false);
      }
    };

    loadSupplier();
  }, [id]);

  return (
    <FormLayout>
      <Botones />

      {/* Mensaje mientras se cargan los datos */}
      {loading && <p className="px-10 py-6">Cargando proveedor...</p>}

      {/* Mensaje si ocurre un error */}
      {error && <p className="px-10 py-6 text-red-600">{error}</p>}

      {/* Solo renderiza el formulario cuando ya hay datos */}
      {!loading && !error && supplier && (
        <SupplierDetailForm supplier={supplier} />
      )}
    </FormLayout>
  );
}