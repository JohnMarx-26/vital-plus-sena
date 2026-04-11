import { SupplierForm } from "@/features/suppliers";
import { FormLayout } from "@/shared";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSupplierById, getCities } from "../services/suppliersService";

export default function EditSupplierPage() {
  // Obtiene el id desde la URL
  const { id } = useParams();

  // Guarda los datos iniciales del formulario
  const [initialData, setInitialData] = useState(null);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado de error
  const [error, setError] = useState("");

  useEffect(() => {
    // Carga el proveedor y la lista de ciudades
    const loadSupplier = async () => {
      try {
        setLoading(true);
        setError("");

        const [supplierData, citiesData] = await Promise.all([
          getSupplierById(id),
          getCities(),
        ]);

        // Busca el id de la ciudad a partir del nombre que llega del detalle
        const matchedCity = citiesData.find(
          (city) =>
            city.nombre_ciudad?.trim().toLowerCase() ===
            supplierData.ciudad?.trim().toLowerCase()
        );

        // Adapta la respuesta del backend al formato del formulario
        const formattedData = {
          suppliertName: supplierData.nombre_proveedor || "",
          documentNumber: supplierData.n_documento
            ? String(supplierData.n_documento)
            : "",
          companyName: supplierData.razon_social || "",
          contactName: supplierData.nombres_contacto || "",
          lastName: supplierData.apellidos_contacto || "",
          phone: supplierData.telefono_contacto
            ? String(supplierData.telefono_contacto)
            : "",
          email: supplierData.correo_electronico || "",
          city: matchedCity ? String(matchedCity.id_ciudad) : "",
          active: supplierData.estado || "activo",
          address: supplierData.direccion || "",
          avatarUrl: null,
        };

        setInitialData(formattedData);
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
      {/* Muestra mensaje mientras carga */}
      {loading && <p className="px-10 py-6">Cargando proveedor...</p>}

      {/* Muestra error si algo falla */}
      {error && <p className="px-10 py-6 text-red-600">{error}</p>}

      {/* Renderiza el formulario cuando ya hay datos */}
      {!loading && !error && initialData && (
        <SupplierForm
          formId="editSupplierForm"
          submitLabel="Actualizar"
          supplierId={id}
          initialData={initialData}
        />
      )}
    </FormLayout>
  );
}