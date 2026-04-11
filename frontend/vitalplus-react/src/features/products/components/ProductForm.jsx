
import { Input, Select, Button, TextArea, Toast} from "@/shared";
import { useEffect, useState } from "react";
import { getFormaTypes } from "../services/selectFormaFarmaceutica";
import { getViaTypes } from "../services/selectViaAdministracion";
import { getLabTypes } from "../services/selectLaboratorio";
import { getPresentationTypes } from "../services/selectPresentacion";
import { getSupplierTypes } from "../services/selectProveedor";
import { getCategoryTypes } from "../services/selectCategoryProduct";
import { AvatarUploader } from "@/features/users";
import { getProductSchema } from "../Schemas/productSchemas";
import { useNavigate } from "react-router-dom";

// servicio de POST para el BACKEND
import { createMedicamento } from "../services/createMedicines";
//Importaciones para modicar el modulo
import { useParams } from "react-router-dom";
//mostrar la informacion previa en los campos 
import { detailProductInfo } from "../services/detailProductInfo";
//hacer el path para actualizar lo que esta en la BD
import { updateMedicamento } from "../services/updateMedicamento";

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

// Opciones para el select de requiere formula, solo visibles para el Administrador
const opcionesFormula = [
  { id: 1, label: "Sí", value: true },
  { id: 2, label: "No", value: false },
];

// Opciones de descuento para el select de descuento
// pasa de 5 en 5 hasta llegar a 50%
const opcionesDescuento = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  label: `${(i + 1) * 5}%`,
  value: (i + 1) * 5,
}));

export default function ProductForm({
  formId = "productForm",
  submitLabel = "Guardar",
}){
  // ============= Tipo de producto =============
  // true = Medicamento o false = Producto genérico
  // Por defecto el formulario abre en modo Medicamento
  const [isMedicamento, setIsMedicamento] = useState(true);

    // ============= Detectar si es edición o creación =============
  const { id } = useParams();
  const isEditing = !!id;

  // ============= Opciones de selects =============
  const [FormaTypes, setFormaTypes] = useState([]);
  const [ViaTypes, setViaTypes] = useState([]);
  const [LabTypes, setLabTypes] = useState([]);
  const [PresentationTypes, setPresentationTypes] = useState([]);
  const [SupplierTypes, setSupplierTypes] = useState([]);
  const [CategoryTypes, setCategoryTypes] = useState([]);

  
  //este  trae el preview a los campos cuando estamos en modificar
  // precvarga el form y activa la version correcta si es producto o medicamento 
  useEffect(() => {
  if (isEditing) {
    /**
     * busca por id y trae el data de la base de datos despues compara la categoria
     * para saber que toggle es (medicamento --- producto )
     *  y despues solo muestra todo el array de la informacion
     */
    detailProductInfo(id).then((data) => {
      setIsMedicamento(data.category === "Medicinas");
      setFormData((prev) => ({
        ...prev,
        id: data.id ?? "", // miestra el ID del producto existente en la BD
        productName: data.title,
        concentration: data.concentration ?? "",
        pharmaceuticalForm: data.pharmaceuticalFormId ?? "",  // ID
        presentation: data.presentationId ?? "",              // ID
        administrationRoute: data.administrationRouteId ?? "", // ID
        lab: data.labId ?? "",                                // ID
        supplier: data.supplierId ?? "",                      // ID
        lotNumber: data.lotNumber ?? "",
        stock: data.stock ?? "",
        manufacturingDate: data.manufacturingDate ?? "",
        expirationDate: data.expirationDate ?? "",
        purchasePrice: data.purchasePrice ?? "",
        salePrice: data.price ?? "",
        salePriceDiscount: data.discount ?? "",
        description: data.description ?? "",
        category: data.categoryId ?? "",
        avatarUrl: data.image ?? null,
      }));
    });
  }
}, [id]);

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const [formData, setFormData] = useState({
    id: "",
    expirationDate: "",
    manufacturingDate: "",
    productName: "",
    administrationRoute: "",
    requiresPrescription: false,
    stock: "",
    purchasePrice: "",
    salePrice: "",
    discount: "0",
    salePriceDiscount: "",
    pharmaceuticalForm: "",
    presentation: "",
    concentration: "",
    lab: "",
    supplier: "",
    lotNumber: "",
    description: "",
    category: "", // campo exclusivo de Producto
    avatarUrl: null,
    avatarFile: null,
  });

  useEffect(() => {
    getFormaTypes().then(setFormaTypes);
    getViaTypes().then(setViaTypes);
    getLabTypes().then(setLabTypes);
    getPresentationTypes().then(setPresentationTypes);
    getSupplierTypes().then(setSupplierTypes);
    getCategoryTypes().then(setCategoryTypes);

  
    // Solo trae el siguiente ID cuando es creación de producto en modificacion 
    //mantiene el ID del  preview de informacion
  if (!isEditing) {
    fetch("http://localhost:8000/api/medicamentos/siguiente-id/")
      .then((res) => res.json())
      .then((data) => {
        setFormData((prev) => ({ ...prev, id: data.siguiente_id }));
      });
  }
}, []);

  // =============  TOGGLE medicamento / producto =============
  // Al cambiar de tipo se limpian los campos que pertenecen
  // exclusivamente a cada categoría para evitar datos huérfanos en el POST
  const handleTipoChange = (esMedicamento) => {
    setIsMedicamento(esMedicamento);

    if (esMedicamento) {
      // Cambió a Medicamento => limpia el campo de categoría osea lo inhabilita
      setFormData((prev) => ({ ...prev, category: "" }));
    } else {
      // Cambió a Producto => limpia los campos exclusivos de medicamento
      // Que son los selects de forma farmaceutica, presentacion,via de administracion
      setFormData((prev) => ({
        ...prev,
        pharmaceuticalForm: "",
        presentation: "",
        concentration: "",
        administrationRoute: "",
      }));
    }

    // Limpia todos los errores al cambiar de tipo
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      // Si cambia salePrice o discount, recalcula salePriceDiscount
      if (name === "salePrice" || name === "discount") {
        const precio = parseFloat(name === "salePrice" ? value : prev.salePrice) || 0;
        const descuento = parseFloat(name === "discount" ? value : prev.discount) || 0;

        /* Actualiza el input de solo lectura salePriceDiscount en tiempo real
        y esto es lo que también se envía al back.
        Si hay descuento → calcula precio con descuento
        Si no hay descuento → muestra el mismo precio de venta */
        updated.salePriceDiscount =
          descuento > 0
            ? (precio - (precio * descuento) / 100).toFixed(2)
            : precio.toFixed(2);
      }

      // Si cambia la forma farmacéutica, resetea presentación y recarga
      // para que dependiendo la forma farmacéutica seleccionada
      // muestre específicamente sus presentaciones
      if (name === "pharmaceuticalForm") {
        updated.presentation = "";
        fetch(`http://localhost:8000/api/presentaciones/?forma=${value}`)
          .then((res) => res.json())
          .then((data) => {
            setPresentationTypes(
              data.map((item) => ({
                id: item.id_presentacion,
                label: item.nombre_presentacion,
                value: item.id_presentacion,
              }))
            );
          });
      }

      return updated;
    });

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  /* Activa el componente para almacenar la imagen del producto.
  Almacena tanto el archivo real para el POST con el backend en file
  como previewUrl para el preview de la imagen cuando se está creando */
  const handleAvatarChange = (file, previewUrl) => {
    setFormData((prev) => ({
      ...prev,
      avatarFile: file,
      avatarUrl: previewUrl || null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const schema = getProductSchema(isMedicamento);
    const result = schema.safeParse(formData);

    if (!result.success) {
      const fieldErrors = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[issue.path[0]] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    //muestra los mensajes segun las acciones crear, modificar, error
    try {
      if (isEditing) {
        await updateMedicamento(id, formData);
        setToast({ show: true, message: "Medicamento actualizado exitosamente", type: "success" });
      } else {
        await createMedicamento(formData);
        setToast({ show: true, message: "Medicamento creado exitosamente", type: "success" });
      }
      } catch (_error) {
        setToast({ show: true, message: "Error al guardar el medicamento", type: "error" });
      }
    }
  return (
    <div className="w-full h-full">
      <Botones />

      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader
          label="Imagen del producto"
          onChange={handleAvatarChange}
          variant="medicamento"
        />
      </div>

      {/* ======= Toggle Medicamento / Producto =======
          Medicamento → habilita: forma farmacéutica, presentación,
          concentración y vía de administración.
          Producto    → los bloquea y habilita el select de categoría */}
      <div className="flex justify-center mt-6 mb-2">
        <div className="flex items-center gap-6 bg-gray-100 rounded-full px-6 py-2 shadow-inner">

          {/* Opción Medicamento */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="tipoProducto"
              checked={isMedicamento}
              onChange={() => handleTipoChange(true)}
              className="accent-blue-600 w-4 h-4"
            />
            <span className={`text-sm font-medium ${isMedicamento ? "text-blue-600" : "text-gray-500"}`}>
              Medicamento
            </span>
          </label>

          <span className="text-gray-300 select-none">|</span>

          {/* Opción Producto */}
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="radio"
              name="tipoProducto"
              checked={!isMedicamento}
              onChange={() => handleTipoChange(false)}
              className="accent-blue-600 w-4 h-4"
            />
            <span className={`text-sm font-medium ${!isMedicamento ? "text-blue-600" : "text-gray-500"}`}>
              Producto
            </span>
          </label>

        </div>
      </div>

      <div className="flex w-full justify-center items-center mt-20 gap-6">
        <form
          id={formId}
          noValidate
          onSubmit={handleSubmit}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {/* ======= ID producto ======= */}
          <Input
            label="ID del producto"
            name="id"
            type="text"
            value={formData.id}
            readOnly
            onChange={handleChange}
            error={errors.id}
          />

          {/* ======= Nombre producto ======= */}
          <Input
            label="Nombre del producto"
            type="text"
            name="productName"
            placeholder="Ingrese el nombre del producto"
            value={formData.productName}
            onChange={handleChange}
            error={errors.productName}
          />

          {/* ======= Forma farmacéutica — habilitado solo en modo Medicamento ======= */}
          <Select
            label="Forma farmacéutica"
            name="pharmaceuticalForm"
            options={FormaTypes}
            value={formData.pharmaceuticalForm}
            onChange={handleChange}
            error={errors.pharmaceuticalForm}
            disabled={!isMedicamento}
          />

          {/* ======= Presentación — habilitado solo en modo Medicamento ======= */}
          <Select
            label="Presentacion"
            name="presentation"
            options={PresentationTypes}
            value={formData.presentation}
            onChange={handleChange}
            error={errors.presentation}
            disabled={!isMedicamento}
          />

          {/* ======= Concentración — habilitado solo en modo Medicamento ======= */}
          <Input
            label="Concentración"
            type="text"
            name="concentration"
            placeholder="Ej: 500mg"
            value={formData.concentration}
            onChange={handleChange}
            error={errors.concentration}
            disabled={!isMedicamento}
          />

          {/* ======= Vía de administración — habilitado solo en modo Medicamento ======= */}
          <Select
            label="Vía de administración"
            name="administrationRoute"
            options={ViaTypes}
            value={formData.administrationRoute}
            onChange={handleChange}
            error={errors.administrationRoute}
            disabled={!isMedicamento}
          />

          {/* ======= Categoría — habilitado solo en modo Producto ======= */}
          <Select
            label="Categoría"
            name="category"
            options={CategoryTypes}
            value={formData.category}
            onChange={handleChange}
            error={errors.category}
            disabled={isMedicamento}
          />

          {/* ======= Laboratorio ======= */}
          <Select
            label="Laboratorio"
            name="lab"
            options={LabTypes}
            value={formData.lab}
            onChange={handleChange}
            error={errors.lab}
          />

          {/* ======= Proveedor ======= */}
          <Select
            label="Proveedor"
            name="supplier"
            options={SupplierTypes}
            value={formData.supplier}
            onChange={handleChange}
            error={errors.supplier}
          />

          {/* ======= Lote ======= */}
          <Input
            label="Número de lote"
            type="text"
            name="lotNumber"
            placeholder="Ingrese el número de lote"
            value={formData.lotNumber}
            onChange={handleChange}
            error={errors.lotNumber}
          />

          {/* ======= Stock ======= */}
          <Input
            label="Número de stock"
            type="text"
            name="stock"
            placeholder="Ingrese el número de stock"
            value={formData.stock}
            onChange={handleChange}
            error={errors.stock}
          />

          {/* ======= Fecha de fabricación ======= */}
          <Input
            label="Fecha de fabricación"
            type="date"
            name="manufacturingDate"
            value={formData.manufacturingDate}
            onChange={handleChange}
            error={errors.manufacturingDate}
          />

          {/* ======= Fecha de vencimiento ======= */}
          <Input
            label="Fecha de vencimiento"
            name="expirationDate"
            type="date"
            value={formData.expirationDate}
            onChange={handleChange}
            error={errors.expirationDate}
          />

          {/* ======= Requiere fórmula (SOLO VISIBLE ADMIN) ======= */}
          {/* {user.rol === "admin" && ( */}
          <Select
            label="Producto con formula"
            name="requiresPrescription"
            options={opcionesFormula}
            value={formData.requiresPrescription}
            onChange={handleChange}
            error={errors.requiresPrescription}
          />
          {/* )} */}

          {/* ======= Precio de compra ======= */}
          <Input
            label="Precio de compra"
            name="purchasePrice"
            type="tel"
            placeholder="Ingrese el precio de compra"
            value={formData.purchasePrice}
            onChange={handleChange}
            error={errors.purchasePrice}
          />

          {/* ======= Precio de venta ======= */}
          <Input
            label="Precio de venta"
            type="tel"
            name="salePrice"
            placeholder="Ingrese el precio de venta"
            value={formData.salePrice}
            onChange={handleChange}
            error={errors.salePrice}
          />

          {/* ======= Descuento ======= */}
          <Select
            label="Descuento"
            name="discount"
            options={opcionesDescuento}
            value={formData.discount}
            onChange={handleChange}
            error={errors.discount}
          />

          {/* ======= Precio con descuento (calculado, solo lectura) ======= */}
          <Input
            label="Precio con descuento"
            name="salePriceDiscount"
            type="tel"
            value={formData.salePriceDiscount}
            readOnly
            onChange={handleChange}
            error={errors.salePriceDiscount}
          />

          {/* ======= Descripción del producto ======= */}
          <TextArea
            label="Descripción del producto"
            name="description"
            type="text"
            placeholder="Ingrese la descripción del producto"
            value={formData.description}
            onChange={handleChange}
            error={errors.description}
          />

          {/* ======= BOTÓN GUARDAR ======= */}
          <div className="sm:col-span-2 lg:col-span-3 flex justify-end mt-0">
            <Button
              variant="secondary"
              size="sm"
              type="submit"
              className="flex items-center gap-2"
            >
            <img src={guardar} alt="icono-guardar" className="w-5 h-5 px-0.5" />
            {isEditing ? "Actualizar" : submitLabel}
          </Button>
          </div>
        </form>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        show={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}