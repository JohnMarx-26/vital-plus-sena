import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormLayout } from "@/shared";
import AdminUserForm from "../components/AdminUserForm";

export default function EditUserPage() {
  // Obtiene el id desde la URL
  const { id } = useParams();

  // Guarda los datos iniciales del formulario
  const [initialData, setInitialData] = useState(null);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado de error
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://127.0.0.1:8000/api/funcionarios/${id}/`);

        if (!response.ok) {
          throw new Error("No se pudo obtener el detalle del funcionario");
        }

        const result = await response.json();

        // Ajusta esto según el formato real del backend
        const user = result.data || result;

        console.log("Respuesta detalle funcionario:", user);

        // Se adapta la respuesta del backend al formato que espera AdminUserForm
        const formattedData = {
          documentType: user.id_tipo_documento ? String(user.id_tipo_documento) : "",
          firstName: user.nombres_funcionario || "",
          lastName: user.apellidos_funcionario || "",
          email: user.correo_electronico || "",
          phone: user.numero_telefonico ? String(user.numero_telefonico) : "",
          documentNumber: user.n_documento ? String(user.n_documento) : "",
          city: user.city ? String(user.city) : "",
          address: user.address || "",
          role: user.id_rol ? String(user.id_rol) : "",
          active: user.estado_cuenta || "activo",
          avatarUrl: user.foto_url || null,
        };

        console.log("Datos formateados para edición:", formattedData);

        setInitialData(formattedData);
      } catch (err) {
        setError(err.message || "No se pudo cargar el funcionario");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  return (
    <FormLayout>
      {loading && <p className="px-10 py-6">Cargando funcionario...</p>}
      {error && <p className="px-10 py-6 text-red-600">{error}</p>}

      {!loading && !error && initialData && (
        <AdminUserForm
          userId={id}
          initialData={initialData}
          submitLabel="Actualizar"
        />
      )}
    </FormLayout>
  );
}