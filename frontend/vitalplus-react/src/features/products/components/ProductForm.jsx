import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import Button from "@/shared/components/Button"
import { useEffect, useState } from "react";
import { getFormaTypes } from "../../users/services/selectFormaFarmaceutica";
import { getViaTypes } from "../../users/services/selectViaAdministracion";
import { AvatarUploader } from "@/features/users";
import { productSchema } from "../Schemas/productSchemas";

export default function ProductForm(){

  const [FormaTypes, setFormaTypes] = useState([]);
  const [ViaTypes, setViaTypes] = useState([]);

    const [formData, setFormData] = useState({
    id: "",
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
     console.log("Usuario válido:", result.data);
   };
  return (

    // CONTENEDOR PADRE
    <div className="w-full h-full">

      {/* SUBIR IMAGEN */}
      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader onChange={handleAvatarChange}/>
      </div>

      {/* CONTENEDOR FORMULARIO */}
      <div className="flex w-1200px h-800px justify-center items-center mt-20">

        {/* FORMULARIO */}
        <form noValidate onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">

          {/* COLUMNA 1 */}
          <div>

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

          </div>

          {/* COLUMNA 2 */}
          <div>

            <Select
              label="Vía de administración"
              name="viaAdministracion"
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
            />

            <Input
              label="Fecha de vencimiento"
              type="date"
            />

          </div>

          {/* COLUMNA 3 */}
          <div>

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

          </div>
                     <div className="col-span-3 flex justify-center mt-6">
            <Button variant="primary" size="md" type="submit">
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}