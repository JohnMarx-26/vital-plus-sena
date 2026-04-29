import { useNavigate } from "react-router-dom";
import { Input, Button, Select } from "@/shared";
import { useEffect, useState } from "react";
import { AvatarUploader } from "@/features/users";
import { supplierSchema } from "../Schemas/supplierSchemas";
import { getSelectCity } from "../services/selectCity";
import { getSelectActive } from "../../users/services/selectActive";
import {
  createSupplier,
  updateSupplier,
} from "../services/suppliersService";
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
  supplierId = null,
  initialData = null,
}) {
  const [selectCity, setSelectCity] = useState([]);
  const [selectActive, setSelectActive] = useState([]);

  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Estado inicial del formulario
  const [formData, setFormData] = useState({
    suppliertName: "",
    documentNumber: "",
    companyName: "",
    contactName: "",
    lastName: "",
    phone: "",
    email: "",
    city: "",
    active: "activo",
    address: "",
    avatarUrl: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getSelectCity().then(setSelectCity);
    getSelectActive().then(setSelectActive);
  }, []);

  // Cuando llega initialData, llena el formulario para edición
  useEffect(() => {
    if (initialData) {
      setFormData({
        suppliertName: initialData.suppliertName || "",
        documentNumber: initialData.documentNumber || "",
        companyName: initialData.companyName || "",
        contactName: initialData.contactName || "",
        lastName: initialData.lastName || "",
        phone: initialData.phone || "",
        email: initialData.email || "",
        city: initialData.city || "",
        active: initialData.active || "activo",
        address: initialData.address || "",
        avatarUrl: initialData.avatarUrl || null,
      });
    }
  }, [initialData]);

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

    setSubmitError("");
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
    setSubmitError("");
    setIsSubmitting(true);

    try {
      // Adapta los datos del formulario al formato esperado por el backend
      const payload = {
        id_tipo_documento: 4,
        n_documento: formData.documentNumber
          ? Number(formData.documentNumber)
          : null,
        nombre_proveedor: formData.suppliertName,
        razon_social: formData.companyName || "",
        nombres_contacto: formData.contactName || "",
        apellidos_contacto: formData.lastName || "",
        telefono_contacto: formData.phone ? Number(formData.phone) : null,
        correo_electronico: formData.email,
        id_ciudad: formData.city ? Number(formData.city) : null,
        direccion: formData.address,
        estado: formData.active,
      };

      // Si hay supplierId actualiza, si no crea
      if (supplierId) {
        await updateSupplier(supplierId, payload);
        alert("Proveedor actualizado correctamente");
      } else {
        await createSupplier(payload);
        alert("Proveedor creado correctamente");
      }

      navigate(-1);
    } catch (error) {
      setSubmitError(
        error.message ||
        (supplierId
          ? "No se pudo actualizar el proveedor"
          : "No se pudo crear el proveedor")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full h-full">
      <div className="flex w-full justify-between px-10">
        <Botones />
      </div>

      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader
          label="Foto del proveedor"
          onChange={handleAvatarChange}
        />
      </div>

      <div className="flex w-1200px h-800px justify-center items-center mt-20 gap-6 ">
        {submitError && (
          <div className="flex justify-center mt-6">
            <p className="text-red-600">{submitError}</p>
          </div>
        )}

        <form
          noValidate
          onSubmit={handleSubmit}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 "
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

          <Select
            label="Ciudad"
            name="city"
            options={selectCity}
            value={formData.city}
            onChange={handleChange}
            error={errors.city}
          />

          <Select
            label="Activo o Inactivo"
            name="active"
            options={selectActive}
            value={formData.active}
            onChange={handleChange}
            error={errors.active}
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
              {isSubmitting
                ? (supplierId ? "Actualizando..." : "Guardando...")
                : submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}