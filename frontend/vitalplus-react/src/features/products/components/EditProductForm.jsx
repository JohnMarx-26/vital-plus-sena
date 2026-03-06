import { useEffect, useState } from "react";
import Input from "../../../shared/components/Input";
import Select from "../../../shared/components/Select";
import Button from "../../../shared/components/Button";
import { getFormaTypes } from "../../users/services/selectFormaFarmaceutica";
import { getViaTypes } from "../../users/services/selectViaAdministracion";

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
    <div className="w-full flex justify-center py-10">

      <div className="w-full max-w-[1500px] px-10 py-8 relative overflow-hidden">

        <div className="flex items-center justify-between mb-8 relative z-10">

          <h2 className="text-xl font-semibold text-black">
            Modificar producto
          </h2>

          <div className="flex gap-4">
            <Button
              size="md"
              className="px-6 py-2 rounded-md border border-gray-400 text-gray-700 hover:bg-gray-100"
              onClick={(e) => {
                e.preventDefault();
                console.log("Retroceder");
              }}
            >
              Retroceder
            </Button>

            <Button
              variant="primary"
              size="md"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md shadow-md"
              onClick={(e) => {
                e.preventDefault();
                console.log("Guardar");
              }}
            >
              Guardar
            </Button>
          </div>
        </div>

        <div className="flex gap-24 items-start relative z-10">

          <form className="flex-1">

            <div className="grid grid-cols-3 flex-wrap items-end gap-x-12 gap-y-6">

              <Input
                label="ID del producto"
                name="numberProducto"
                placeholder="Modifique el ID del medicamento"
              />

              <Input
                label="Nombre del producto"
                name="nameProducto"
                placeholder="Modifique el nombre del producto"
              />

              <div className="w-full">
                <Select
                  label="Forma farmacéutica"
                  name="documentType"
                  options={FormaTypes}
                />
              </div>

              <div className="w-full">
                <Select
                  label="Via de administración"
                  name="userType"
                  options={ViaTypes}
                />
              </div>

              <Input
                label="Número de lote"
                name="numLote"
                placeholder="Modifique el número de lote"
              />

              <Input
                label="Numero stock"
                name="numStock"
                placeholder="Modifique el numero de stock"
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
                placeholder="Modifique si requiere formula (Si o No)"
              />

              <Input
                label="Precio de compra"
                type="int"
                name="precioCompra"
                placeholder="Modifique el precio de compra"
              />

              <Input
                label="Precio de venta"
                type="int"
                name="precioVenta"
                placeholder="Modifique el precio de venta"
              />

              <Input
                label="Descripcion del producto"
                name="descripcionProducto"
                placeholder="Modifique la descripcion del producto"
              />

            </div>

            <div className="mt-10">
              <Button
                type="button"
                size="md"
                className={`px-6 py-2 rounded-md shadow-md text-white ${
                  userStatus === "Activo"
                    ? "bg-gray-500 hover:bg-gray-700"
                    : "bg-blue-500 hover:bg-blue-600"
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

            <div className="w-56 h-56 rounded-full border border-gray-400 flex items-center justify-center">
              <span className="text-gray-500">Foto</span>
            </div>

            <label
              htmlFor="avatar"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md cursor-pointer shadow"
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