import ProfileUserForm from "@/features/users/components/ProfileUserForm";
import { FormLayout, Button } from "@/shared";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import retroceder from "@/assets/svg/icono-retroceder.svg";

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

const documentTypeMap = {
  1: "Cédula de ciudadanía",
  2: "Cédula de Extranjería",
  3: "Pasaporte",
  4: "NIT",
  5: "PEP",
  6: "PPT",
  7: "Tarjeta de Identidad",
};

const cityMap = {
  1: "Pereira",
  2: "Manizales",
  3: "Medellin",
  4: "Bogotá",
  5: "Barranquilla",
  6: "Bucaramanga",
  7: "Cali",
  8: "Ibagué",
  9: "Armenia",
};

export default function ProfileUserPage() {
  // Obtiene el id desde la URL
  const { id } = useParams();

  // Estado con la información del funcionario
  const [user, setUser] = useState(null);

  // Estado de carga
  const [loading, setLoading] = useState(true);

  // Estado de error
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        setError("");

        const [detailResponse, rolesResponse] = await Promise.all([
          fetch(`http://127.0.0.1:8000/api/funcionarios/${id}/`),
          fetch("http://127.0.0.1:8000/api/roles/"),
        ]);

        if (!detailResponse.ok) {
          throw new Error("No se pudo obtener el detalle del funcionario");
        }

        if (!rolesResponse.ok) {
          throw new Error("No se pudo obtener la lista de roles");
        }

        const detailResult = await detailResponse.json();
        const rolesResult = await rolesResponse.json();

        // Soporta respuesta con o sin objeto data
        const detail = detailResult.data || detailResult;

        // Busca el nombre del rol a partir del id
        const currentRole = rolesResult.find(
          (role) => role.id_rol === detail.id_rol
        );

        // Formatea la información para el formulario de detalle
        const formattedUser = {
          id: detail.id_funcionario,
          fullName: `${detail.nombres_funcionario || ""} ${detail.apellidos_funcionario || ""}`.trim(),
          documentType:
            documentTypeMap[detail.id_tipo_documento] || "No disponible",
          documentNumber: detail.n_documento || "No disponible",
          role: currentRole?.nombre_rol || "No disponible",
          email: detail.correo_electronico || "No disponible",
          phone: detail.numero_telefonico || "No disponible",
          address: detail.address
            ? `${cityMap[detail.city] ? `${cityMap[detail.city]}, ` : ""}${detail.address}`
            : "No disponible",
          createdAt: "No disponible",
          status: detail.estado_cuenta || "inactivo",
          avatarUrl: detail.foto_url || null,
        };

        setUser(formattedUser);
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
      <Botones />

      {loading && <p className="px-10 py-6">Cargando funcionario...</p>}
      {error && <p className="px-10 py-6 text-red-600">{error}</p>}

      {!loading && !error && user && <ProfileUserForm user={user} />}
    </FormLayout>
  );
}