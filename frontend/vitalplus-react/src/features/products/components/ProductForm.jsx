import { Input, Select, Button } from "@/shared";
import { useEffect, useState } from "react";
import { getFormaTypes } from "../../users/services/selectFormaFarmaceutica";
import { getViaTypes } from "../../users/services/selectViaAdministracion";
import { AvatarUploader } from "@/features/users";
import { productSchema } from "../Schemas/productSchemas";
import { useNavigate } from "react-router-dom";

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

export default function ProductForm({
  formId = "productForm",
  submitLabel = "Guardar",
}) {
  const [FormaTypes, setFormaTypes] = useState([]);
  const [ViaTypes, setViaTypes] = useState([]);

  const [formData, setFormData] = useState({
    id: "",
    expirationDate: "",
    manufacturingDate: "",
    productName: "",
    administrationRoute: "",
    requiresPrescription: "",
    stock: "",
    purchasePrice: "",
    salePrice: "",
    pharmaceuticalForm: "",
    lotNumber: "",
    description: "",
    avatarUrl: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    getFormaTypes().then(setFormaTypes);
    getViaTypes().then(setViaTypes);
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
  };

  const handleAvatarChange = (_, previewUrl) => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: previewUrl || null,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = productSchema.safeParse(formData);

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
    console.log(
      submitLabel === "Actualizar"
        ? "Producto actualizado:"
        : "Producto creado:",
      result.data
    );
  };

  return (
    <div className="w-full h-full">
      <Botones />

      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader
          label="Imagen del producto"
          onChange={handleAvatarChange}
        />
      </div>

      <div className="flex w-full justify-center items-center mt-20 gap-6">
        <form
          id={formId}
          noValidate
          onSubmit={handleSubmit}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <Input
            label="ID del producto"
            name="id"
            type="text"
            placeholder="Ingrese el ID del producto"
            value={formData.id}
            onChange={handleChange}
            error={errors.id}
          />

          <Input
            label="Nombre del producto"
            type="text"
            name="productName"
            placeholder="Ingrese el nombre del producto"
            value={formData.productName}
            onChange={handleChange}
            error={errors.productName}
          />

          <Select
            label="Forma farmacéutica"
            name="pharmaceuticalForm"
            options={FormaTypes}
            value={formData.pharmaceuticalForm}
            onChange={handleChange}
            error={errors.pharmaceuticalForm}
          />

          <Input
            label="Número de lote"
            type="text"
            name="lotNumber"
            placeholder="Ingrese el número de lote"
            value={formData.lotNumber}
            onChange={handleChange}
            error={errors.lotNumber}
          />

          <Select
            label="Vía de administración"
            name="administrationRoute"
            options={ViaTypes}
            value={formData.administrationRoute}
            onChange={handleChange}
            error={errors.administrationRoute}
          />

          <Input
            label="Número de stock"
            type="text"
            name="stock"
            placeholder="Ingrese el número de stock"
            value={formData.stock}
            onChange={handleChange}
            error={errors.stock}
          />

          <Input
            label="Fecha de fabricación"
            type="date"
            name="manufacturingDate"
            value={formData.manufacturingDate}
            onChange={handleChange}
            error={errors.manufacturingDate}
          />

          <Input
            label="Fecha de vencimiento"
            name="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={handleChange}
            error={errors.expirationDate}
          />

          <Input
            label="Requiere fórmula"
            type="text"
            name="requiresPrescription"
            placeholder="Indique si requiere fórmula (Sí o No)"
            value={formData.requiresPrescription}
            onChange={handleChange}
            error={errors.requiresPrescription}
          />

          <Input
            label="Precio de compra"
            name="purchasePrice"
            type="number"
            placeholder="Ingrese el precio de compra"
            value={formData.purchasePrice}
            onChange={handleChange}
            error={errors.purchasePrice}
          />

          <Input
            label="Precio de venta"
            type="number"
            name="salePrice"
            placeholder="Ingrese el precio de venta"
            value={formData.salePrice}
            onChange={handleChange}
            error={errors.salePrice}
          />

          <Input
            label="Descripción del producto"
            name="description"
            type="text"
            placeholder="Ingrese la descripción del producto"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />
          <div className="sm:col-span-2 lg:col-span-3 flex justify-end mt-0">
          <Button
            variant="secondary"
            size="sm"
            type="submit"
            className="flex items-center gap-2"
          >
            <img
              src={guardar}
              alt="icono-guardar"
              className="w-5 h-5 px-[2px]"
            />
            {submitLabel}
          </Button>
          </div>
        </form>
      </div>
    </div>
  );
}