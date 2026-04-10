import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button } from "@/shared";
import { AvatarUploader } from "@/features/users";
import { supplierSchema } from "../Schemas/supplierSchemas";
import { createSupplier, getCities } from "../services/supplierService";
import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";

const Botones = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between px-10">
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
  );
};

export default function SupplierForm({
  formId = "suppliersForm",
  submitLabel = "Guardar",
}) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    suppliertName: "",
    documentNumber: "",
    companyName: "",
    contactName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    avatarUrl: null,
  });

  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [serverError, setServerError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getCities()
      .then(setCities)
      .catch((error) => {
        console.error("Error cargando ciudades:", error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setServerError("");
  };

  const handleAvatarChange = (_, previewUrl) => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: previewUrl || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = supplierSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((issue) => {
        const field = issue.path[0];
        fieldErrors[field] = issue.message;
      });

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setServerError("");
    setIsSubmitting(true);

    try {
      const citySelected = cities.find(
        (item) =>
          item.nombre_ciudad.trim().toLowerCase() ===
          result.data.city.trim().toLowerCase()
      );

      if (!citySelected) {
        setErrors((prev) => ({
          ...prev,
          city: "Debe ingresar una ciudad válida de la base de datos",
        }));
        setIsSubmitting(false);
        return;
      }

      const payload = {
        id_tipo_documento: 4,
        nombre_proveedor: result.data.suppliertName.trim(),
        razon_social: result.data.companyName.trim(),
        nombres_contacto: result.data.contactName.trim(),
        apellidos_contacto: result.data.lastName.trim(),
        telefono_contacto: Number(result.data.phone),
        correo_electronico: result.data.email.trim().toLowerCase(),
        id_ciudad: citySelected.id_ciudad,
        direccion: result.data.address.trim(),
        estado: "activo",
      };

      await createSupplier(payload);
      navigate("/proveedores/listar");
    } catch (error) {
      console.error("Error creando proveedor:", error);
      setServerError(error.message || "No se pudo crear el proveedor");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full">
      <Botones />

      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader
          label="Foto del proveedor"
          onChange={handleAvatarChange}
        />
      </div>

      <form
        noValidate
        onSubmit={handleSubmit}
        className="w-full max-w-[1008px] mx-auto mt-20 px-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        id={formId}
      >
        <Input
          label="Nombre proveedor"
          name="suppliertName"
          type="text"
          placeholder="Ingrese el nombre del proveedor"
          value={formData.suppliertName}
          onChange={handleChange}
          error={errors.suppliertName}
        />

        <Input
          label="NIT"
          name="documentNumber"
          type="text"
          placeholder="Ingrese el NIT"
          value={formData.documentNumber}
          onChange={handleChange}
          error={errors.documentNumber}
        />

        <Input
          label="Razon social"
          name="companyName"
          type="text"
          placeholder="Ingrese la razon social"
          value={formData.companyName}
          onChange={handleChange}
          error={errors.companyName}
        />

        <Input
          label="Nombre contacto (representante)"
          name="contactName"
          type="text"
          placeholder="Ingrese el nombre del contacto"
          value={formData.contactName}
          onChange={handleChange}
          error={errors.contactName}
        />

        <Input
          label="Apellido contacto"
          name="lastName"
          type="text"
          placeholder="Ingrese el apellido del contacto"
          value={formData.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <Input
          label="Telefono contacto"
          name="phone"
          type="tel"
          placeholder="Ingrese el numero del contacto"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />

        <Input
          label="Correo electronico contacto"
          name="email"
          type="email"
          placeholder="Ingrese el correo electronico"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Ciudad"
          name="city"
          type="text"
          placeholder="Ingrese una ciudad válida, por ejemplo Pereira"
          value={formData.city}
          onChange={handleChange}
          error={errors.city}
        />

        <Input
          label="Direccion"
          name="address"
          type="text"
          placeholder="Ingrese la direccion del proveedor"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
        />

        {serverError && (
          <p className="sm:col-span-2 lg:col-span-3 text-sm text-red-600">
            {serverError}
          </p>
        )}

        <div className="sm:col-span-2 lg:col-span-3 flex justify-end mt-0">
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            className="flex items-center gap-2"
            form={formId}
            disabled={isSubmitting}
          >
            <img
              src={guardar}
              alt="icono-guardar"
              className="w-5 h-5 px-[2px]"
            />
            {isSubmitting ? "Guardando..." : submitLabel}
          </Button>
        </div>
      </form>
    </div>
  );
}