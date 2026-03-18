import Input from "@/shared/components/Input";
import { useState } from "react";
import { AvatarUploader } from "@/features/users";
import { supplierSchema } from "../Schemas/supplierSchemas";
import { useNavigate } from "react-router-dom";
import Button from "@/shared/components/Button";
import guardar from "@/assets/svg/icono-guardar.svg";
import retroceder from "@/assets/svg/icono-retroceder.svg";
// import { SquarePen } from "lucide-react";

/*se crea una arrow function para los botones del formulario
    a esta funcion se le realiza un callback cuando se ejecuta
    el FormLayout, dentro de esta funcion esta la logica de los botones
    y sus estilos*/

const Botones = () => {
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-between">
      <div>
        {/* //========= Boton Retroceder ======= */}
        <Button
          variant="secondary"
          size="sm"
          type="button"
          //para devolverme al apartado del menu del administrador
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <img src={retroceder} alt="icono-retroceder" className="w-5 h-5" />
          Retroceder
        </Button>
      </div>
      <div>
        {/* //========= Boton Modificar ======= 
                    <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        // onClick={() => navigate ("")}
                    >
                        <SquarePen className="w-5 h-5"/>
                        Modificar
                    </Button> */}

        {/* //========= Boton Guardar ======= */}
        <Button
          variant="secondary"
          size="sm"
          type="submit"
          // onClick={() => ()}
          className="flex items-center gap-2"
          form="suppliersForms"
        >
          {/* Se pone padding en X de 2 px porque el icono estaba muy pegado al texto */}
          <img
            src={guardar}
            alt="icono-modificar"
            className="w-5 h-5 px-0.5"
          />
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default function ProveedorForm() {
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
  };

  const handleAvatarChange = (_, previewUrl) => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: previewUrl || null,
    }));
  };

  const handleSubmit = (e) => {
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
    console.log("Usuario válido:", result.data);
  };

  return (
    // ==================Contenedor PADRE =====================//
    <div className="w-full h-full">
      {/* //============ Boton de retroceder y guardar ============== */}
      <div className="flex w-full justify-between px-10">
        <Botones />
      </div>

      {/* //============ Avatar =============== */}
      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader onChange={handleAvatarChange} />
      </div>

      <div className=" flex w-1200px h-800px justify-center items-center mt-8">
        {/* //=================== Formulario ========================== */}
        <form
          noValidate
          onSubmit={handleSubmit}
          className="grid grid-cols-3 gap-4 "
          id="suppliersForms"
        >
          {/* //========= Columna 1 ======= */}
          <div>
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
              placeholder="Ingrese el NIT "
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
          </div>

          {/* //========= Columna 2 ======= */}
          <div>
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
              label="apellido contacto"
              name="lastName"
              type="tel"
              placeholder="Ingrese el apellido del contactos"
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
          </div>

          {/* //========= Columna 3 ======= */}
          <div>
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
              label="ciudad"
              name="city"
              type="text"
              placeholder="Ingrese la ciudad del proveedor"
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
          </div>
        </form>
      </div>
    </div>
  );
}
