import { useEffect, useState } from "react";
import Input from "./../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "./../../../shared/components/Button";
import { getFormaTypes } from "../services/selectFormaFarmaceutica";
import { getViaTypes } from "../services/selectViaAdministracion";

export default function ProductForm() {
  const [FormaTypes, setFormaTypes] = useState([]);
  const [ViaTypes, setViaTypes] = useState([]);
    const [userStatus, setUserStatus] = useState("Activo");


  useEffect(() => {
    getFormaTypes().then(setFormaTypes);
    getViaTypes().then(setViaTypes);
  }, []);

  const toggleStatus = () => {
    setUserStatus((prev) => (prev === "Activo" ? "Inactivo" : "Activo"));
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1200px] px-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-text-primary">
            Crear producto
          </h2>

          <Button
            variant="primary"
            size="md"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md shadow-md transition duration-200"
            onClick={(e) => {
              e.preventDefault();
              console.log("Guardar");
            }}
          >
            Guardar
          </Button>
        </div>

        <div className="flex gap-16 items-start">

          <form className="flex-1">
            <div className="flex flex-wrap gap-x-12 gap-y-6">

              {/* Tipo de documento */}

              <Input
                label="ID del producto"
                name="numberProducto"
                placeholder="Ingrese el ID del medicamento"
              />

              <Input
                label="Nombre del producto"
                name="nameProducto"
                placeholder="Ingrese el nombre del producto"
              />

              <div className="w-[320px]">
                <Select
                  label="Forma farmacéutica"
                  name="documentType"
                  options={FormaTypes}
                />
              </div>
              <div className="w-[320px]">
                <Select
                  label="Via de administración"
                  name="userType"
                  options={ViaTypes}
                />
              </div>
              <Input
                label="Número de lote"
                name="numLote"
                placeholder="Ingrese el número de lote"
              />


              <Input
                label="Numero stock"
                name="numStock"
                placeholder="Ingrese el numero de stock"
              />

                <Input
                label="Fecha de vencimiento"
                type="date"
                name="fechaVencimiento"
                disabled
                />
            <Input
            label="Fecha de fabricacion"
            type="date"
            name="fechaFabricacion"
            disabled
            />
              <Input
                label="Requiere formula"
                name="requiereFormula"
                placeholder="Ingrese si requiere formula (Si o No)"
              />

              <Input
                label="Precio de compra"
                type="int"
                name="precioCompra"
                placeholder="Ingrese el precio de compra"
              />

              <Input
                label="Precio de venta"
                type="int"
                name="precioVenta"
                placeholder="Ingrese el precio de venta"
              />



              <Input
                label="Descripcion del producto"
                name="descripcionProducto"
                placeholder="Ingrese la descripcion del producto"

              />
            </div>
            <div className="mt-8">
              <Button
                type="button"
                size="md"
                className={`px-6 py-2 rounded-md shadow-md transition duration-200 text-white ${
                  userStatus === "Activo"
                    ? "bg-gray-500 hover:bg-gray-700"
                    : "bg-blue-400 hover:bg-blue-600"
                }`}
                onClick={toggleStatus}
              >
                {userStatus === "Activo"
                  ? "Producto Inactivo"
                  : "Producto Activo"}
              </Button>
            </div>     

          </form>

          <div className="w-[320px] flex flex-col items-center gap-6">
            <div className="w-44 h-44 rounded-full border border-border flex items-center justify-center">
              <span className="text-text-muted">Foto</span>
            </div>

            <label
              htmlFor="avatar"
              className="bg-brand text-brand-soft px-4 py-2 rounded-md cursor-pointer"
            >
              Cargar imagen
            </label>

            <input id="avatar" type="file" className="hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}