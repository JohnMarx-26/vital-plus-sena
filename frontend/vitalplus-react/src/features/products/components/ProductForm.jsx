import Input from "@/shared/components/Input";
import Select from "@/shared/components/Select";
import { useEffect, useState } from "react";
import { getFormaTypes } from "../../users/services/selectFormaFarmaceutica";
import { getViaTypes } from "../../users/services/selectViaAdministracion";
import { AvatarUploader } from "@/features/users";

export default function ProductForm(){

  const [FormaTypes, setFormaTypes] = useState([]);
  const [ViaTypes, setViaTypes] = useState([]);

  useEffect(() => {
    getFormaTypes().then(setFormaTypes);
    getViaTypes().then(setViaTypes);
  }, []);

  return (

    // CONTENEDOR PADRE
    <div className="w-full h-full">

      {/* SUBIR IMAGEN */}
      <div className="flex h-36 justify-center gap-8">
        <AvatarUploader/>
      </div>

      {/* CONTENEDOR FORMULARIO */}
      <div className="flex w-1200px h-800px justify-center items-center mt-20">

        {/* FORMULARIO */}
        <form className="grid grid-cols-3 gap-4">

          {/* COLUMNA 1 */}
          <div>

            <Input
              label="ID del producto"
              type="text"
              placeholder="Ingrese el ID del producto"
            />

            <Input
              label="Nombre del producto"
              type="text"
              placeholder="Ingrese el nombre del producto"
            />

            <Select
              label="Forma farmacéutica"
              name="formaFarmaceutica"
              options={FormaTypes}
            />

            <Input
              label="Número de lote"
              type="text"
              placeholder="Ingrese el número de lote"
            />

          </div>

          {/* COLUMNA 2 */}
          <div>

            <Select
              label="Vía de administración"
              name="viaAdministracion"
              options={ViaTypes}
            />

            <Input
              label="Número de stock"
              type="text"
              placeholder="Ingrese el número de stock"
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
              placeholder="Indique si requiere fórmula (Sí o No)"
            />

            <Input
              label="Precio de compra"
              type="number"
              placeholder="Ingrese el precio de compra"
            />

            <Input
              label="Precio de venta"
              type="number"
              placeholder="Ingrese el precio de venta"
            />

            <Input
              label="Descripción del producto"
              type="text"
              placeholder="Ingrese la descripción del producto"
            />

          </div>

        </form>
      </div>
    </div>
  );
}