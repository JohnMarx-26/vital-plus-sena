import { detailProductInfo } from "../services/detailProductInfo";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {Button} from "@/shared";
import { SquarePen } from "lucide-react";
import medicamento from "@/assets/svg/Rectangle-63.svg";


export default function ProductDetailForm() {

  //usamos Params para leer la url  y capturar el ID
  //asi se sabe en espefico lainformación que vamos a renderizar
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    detailProductInfo(id).then(setProduct);
  }, [id]);

  //============== Boton del estado del producto ===============
  const [userStatus, setUserStatus] = useState(null);

  useEffect(() => {
  if (product) {
    setUserStatus(product.status); // "activo" o "inactivo" desde la Base de datos
  }
}, [product]);

  const toggleStatus = async () => {
  const nuevoEstado = userStatus === "activo" ? "inactivo" : "activo";
  
  await fetch(`http://localhost:8000/api/medicamentos/${id}/`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ estado_medicamento: nuevoEstado }),
  });

  setUserStatus(nuevoEstado);
};
  //=========================================================
const userDetails = [
  { label: "ID Medicamento", value: product?.id },
  { label: "Nombre del medicamento", value: product?.title },
  { label: "Categoría", value: product?.category },
  { label: "Forma farmacéutica", value: product?.pharmaceuticalForm },
  { label: "Presentación", value: product?.presentation },
  { label: "Concentración", value: product?.concentration },
  { label: "Vía de administración", value: product?.administrationRoute },
  { label: "Laboratorio", value: product?.lab },
  { label: "Proveedor", value: product?.supplier },
  { label: "Requiere fórmula", value: product?.requiresPrescription },
  { label: "Número de lote", value: product?.lotNumber },
  { label: "Stock", value: product?.stock },
  { label: "Fecha de fabricación", value: product?.manufacturingDate },
  { label: "Fecha de vencimiento", value: product?.expirationDate },
  { label: "Precio de compra", value: product?.purchasePrice },
  { label: "Precio de venta", value: product?.price },
  { label: "Precio con descuento", value: product?.discount },
  { label: "Descripción", value: product?.description },
];
  const handleEdit = () => {
    console.log("Modificar producto");
  };

  return (
    <section className="flex w-full px-6 py-8 justify-center">
      <div className="mx-auto flex w-full flex-col gap-8 lg:flex-row lg:items-start justify-center">

        <aside className="w-full lg:max-w-sm">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

            <div className="mb-6 flex justify-center">
              <h1 className="border-b-2 border-slate-900 pb-1 text-body font-medium text-slate-900">
                Opciones de producto
              </h1>
            </div>

            <div className="flex flex-col items-center">

              <div className="flex h-70 w-70 items-center justify-center">
                <img
                //si no existe imagne que tome por defecto la que esta en assets 
                  src={product?.image ?? medicamento}
                  alt="Imagen medicamento"
                  className="h-70 w-70"
                />
              </div>

              <div className="mt-6 w-full max-w-xs border-b border-slate-400 pb-3 text-center">
                <p className="text-sm font-medium text-slate-800">
                  {product?.title}
                </p>
              </div>

              <div className="mt-5 flex w-full flex-col items-center gap-4">

                <div className="flex flex-wrap items-center justify-center gap-3">

                  <Button
                    type="button"
                    size="md"
                    className={`px-6 py-2 rounded-md shadow-md text-white ${
                      userStatus === "activo"
                        ? "bg-gray-500 hover:bg-gray-700"
                        : "bg-brand hover:bg-brand-hover"
                    }`}
                    onClick={toggleStatus}
                  >
                    {userStatus === "activo"
                      ? "Desactivar producto"
                      : "Activar producto"}
                  </Button>

                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    onClick={handleEdit}
                    className="flex items-center gap-2"
                  >
                    <SquarePen className="w-5 h-5" />
                    Modificar
                  </Button>

                </div>

              </div>

            </div>

          </div>
        </aside>

        <div className="w-full max-w-175">
          <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">

            <div className="flex flex-col gap-6">

              {userDetails.map((item) => (
                <div
                  key={item.label}
                  className="grid grid-cols-[220px_1fr] items-start gap-x-8"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {item.label}:
                  </span>

                  <span className="text-sm text-slate-900 break-words">
                    {item.value}
                  </span>

                </div>
              ))}

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}