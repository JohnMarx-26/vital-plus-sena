import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Select, formatCurrency,Input} from "@/shared";
import { Trash2, SquarePlus, ChevronDown, BanknoteArrowDown } from "lucide-react";
import  usuario from "@/assets/svg/icono-usu-dark.svg";
import { getMetodosPago } from "../services/getMetodosPago";
import { getBancos } from "../services/getBancos";

const SaleFormPos = ({ children }) => { 

  //estado para el metodo de pago y Bancos
const [metodosPago, setMetodosPago] = useState([]);
const [bancos, setBancos] = useState([]);
const [metodoPago, setMetodoPago] = useState("");
const [banco, setBanco] = useState("");

  // fetch para los selects 
useEffect(() => {
  getMetodosPago().then((data) => {  setMetodosPago(data); });
  getBancos().then((data) => { setBancos(data); });
}, []);

    // 2. Filtrar métodos según banco seleccionado
const metodosFiltrados = banco
  ? metodosPago.filter((m) => m.id_banco === Number(banco))
  : [];

  //estado para poner productos en el listado de preview
  const [listaVenta, setListaVenta] = useState([]);

  const agregarProducto = (producto) => {
    const existe = listaVenta.find((item) => item.id === producto.id);
    if (existe) {
      setListaVenta(
        listaVenta.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      );
    } else {
      setListaVenta([...listaVenta, { ...producto, cantidad: 1 }]);
    }
  };

  const total = listaVenta.reduce((acc, item) => {
    const precio =
      item.discount && item.discount > 0 ? item.discount : item.price;
    return acc + precio * item.cantidad;
  }, 0);

  // ======================== Eliminar un solo producto =================//
  const eliminarProducto = (id) => {
    // Filtramos la lista: se quedan todos los que NO coincidan con el id seleccionado
    setListaVenta(listaVenta.filter((item) => item.id !== id));
  };

  //======================= Vaciar todo el carrito ==================//
  const vaciarCarrito = () => {
    setListaVenta([]); // Borra TODO de un solo golpe
  };


  //valores de facturacion
  const iva = total * 0.19;
  const subtotal = total - iva;

  return (
    // =================================== Contenedor Padre ==========================//
    <div className="flex h-[80vh] w-full border rounded-2xl overflow-hidden bg-background shadow-xl">
      {/* //=============================== Contenedor Izquierdo ==========================// */}
      <div className="w-2/3 overflow-y-auto bg-gray-50 border-r border-border-strong">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onSelectProduct: agregarProducto,
            });
          }
          return child;
        })}
      </div>

      {/* //==================== Contenedor Derecho listado de productos ============================ */}
      <div className="w-1/3 flex flex-col bg-background">
        {/* //=============================== Cabecera del Panel =============================== */}
        <details>
          <summary className="p-2 border-b font-bold text-xs text-text-primary">
            Factura: FAC000123
          </summary>
          <p className="flex gap-3 p-2 border-b font-bold text-xs text-text-primary items-center">
            <img src={usuario} className="size-6" />
            Usuario: Farmaceuta23
          </p>
          <details className=" border-b">
            <summary className="flex p-2 gap-2 items-center">
              <img src={usuario} className="size-6" />
              <p className=" font-bold text-xs ">Datos Cliente</p>
              <ChevronDown className="size-5 text-text-muted " />
            </summary>
            <div className="flex px-2 my-1 p-2 pr-5">
              <Input label="Documento de Identidad" />
              <div>
                <Link
                  to="/usuariosSale/crear"
                  className="flex text-xs font-bold pr-2 pt-6 items-center gap-2"
                >
                  Nuevo
                  <SquarePlus />
                </Link>
              </div>
            </div>
          </details>
          <details className=" border-b">
            <summary className="flex p-2 gap-2 items-center">
              <BanknoteArrowDown className="size-6" />
              <p className=" font-bold text-xs ">Metodos de pago</p>
              <ChevronDown className="size-5 text-text-muted " />
            </summary>
            <div className="grid px-2 my-2 gap-2">

              {/* //============ Bancos =============== */}
              <Select
                label="Banco"
                name="banco"
                options={bancos}
                value={banco}
                onChange={(e) => {
                  setBanco(e.target.value);
                  setMetodoPago("");
                }}
              />

              {/* //============ Metodos de Pago =============== */}
              <Select
                label="Método de pago"
                name="metodoPago"
                options={metodosFiltrados}
                value={metodoPago}
                onChange={(e) => setMetodoPago(e.target.value)}
                disabled={!banco}
              />
            </div>
          </details>
        </details>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {listaVenta.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-text-muted opacity-50">
              <p>Carrito vacío</p>
            </div>
          ) : (
            listaVenta.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center p-2 border-b border-background-muted"
              >
                <div className="flex flex-col">
                  <span className="w-40 text-xs font-bold uppercase line-clamp-2">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-brand font-bold">
                    Cant: {item.cantidad}
                  </span>
                </div>
                <span className="text-sm font-bold">
                  {formatCurrency(
                    (item.discount || item.price) * item.cantidad
                  )}
                </span>

                <Button
                  onClick={() => eliminarProducto(item.id)}
                  className="  bg-red-500  hover:bg-red-800 text-background font-bold text-xs p-1"
                  title="Quitar producto"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </div>
            ))
          )}
        </div>

        {/* //================= Total de la venta ===================  */}

        <div className="p-6 bg-gray-50 border-t">
          <div className="flex flex-col items-center mb-4 bg-brand-light border rounded-lg border-brand-light px-1">
            <div className="flex gap-45">
              <p className="text-small  text-text-primary font-bold ">
                Subtotal
              </p>
              <p className="text-body font-black text-brand">
                {formatCurrency(subtotal)}
              </p>
            </div>
            <div className="flex gap-46">
              <p className="text-small  text-text-primary font-bold ">
                Iva 19%
              </p>
              <p className="text-body font-black text-brand">
                {formatCurrency(iva)}
              </p>
            </div>
            <div className="flex gap-38">
              <p className="text-small  text-text-primary font-bold ">
                Total a Pagar
              </p>
              <p className="text-body font-black text-brand">
                {formatCurrency(total)}
              </p>
            </div>
          </div>

          {/* //==================== Botones =================  */}
          <div className="flex w-full justify-between">
            {/* //==================== Boton cancelar Venta =============== */}
            <Button
              onClick={() => vaciarCarrito()}
              disabled={listaVenta.length === 0}
              className=" bg-red-500 text-small text-background py-4 rounded-xl font-bold hover:bg-red-800  disabled:opacity-50 transition-all"
            >
              Cancelar Venta
            </Button>

            {/* //==================== Boton Finalizar Venta =============== */}
            <Button
              onClick={() => alert("Venta procesada con éxito")}
              disabled={listaVenta.length === 0}
              className="bg-brand  text-small text-background py-4 rounded-xl font-bold hover:brightness-110 disabled:opacity-50 transition-all"
            >
              Finalizar Venta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleFormPos;
