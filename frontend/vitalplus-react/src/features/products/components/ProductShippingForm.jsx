import { Button, Input } from "@/shared";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { productShippingSchemas } from "../Schemas/productShippingSchemas";

/*=============================================================
Este formulario se utiliza en la pagina de detalle de productos
en la vista cliente, se utiliza para crear un comentario del 
producto 
===============================================================*/

export default function ProductShippingForm() {

  const [formData, setFormData] = useState({
    department: "",
    town: "",
    address: "",
    complement: "", 
    neighborhood: "", 
    addressee: "", 
  });

//===================================================================
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
//==================================================
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = productShippingSchemas.safeParse(formData);

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

    navigate("/cart/payment");
  };

  return (
    // ================= Contenedor Padre =================
    <div className="flex flex-col w-full p-1">
      {/* // ================= Formulario =================*/}
      <form onSubmit={handleSubmit} className="grid gap-6 grid-cols-1 md:grid-cols-2  flex-1">

          <Input
            label="Departamento"
            name="department"
            type="text"
            placeholder="Departamento de residencia"
            value={formData.department}
            onChange={handleChange}
            error={errors.department}
          />
          <Input
            label="Municipio"
            name="town"
            type="text"
            placeholder="Municipio de residencia"
            value={formData.town}
            onChange={handleChange}
            error={errors.town}
          />

          <Input
            label="direccion"
            name="address"
            type="text"
            placeholder="Direccion del residencia"
            value={formData.address}
            onChange={handleChange}
            error={errors.address}
          />
          <Input
            label="Información adicional(ej: apto 201)"
            name="complement"
            type="text"
            placeholder="Direccion complementaria"
            value={formData.complement}
            onChange={handleChange}
            error={errors.complement}
          />
          <Input
            label="Barrio"
            name="neighborhood"
            type="text"
            placeholder="barrio de residencia"
            value={formData.neighborhood}
            onChange={handleChange}
            error={errors.neighborhood}
          />
          <Input
            label="Destinatario"
            name="addressee"
            type="text"
            placeholder="Destinatario del envio"
            value={formData.addressee}
            onChange={handleChange}
            error={errors.addressee}
          />
          {/* //========================= Boton ========================== */}
          <div className="col-span-full flex justify-end">
            <Button variant="primary" type="submit">
              Realizar Pago
            </Button>
          </div>
      </form>
    </div>
  );
}
