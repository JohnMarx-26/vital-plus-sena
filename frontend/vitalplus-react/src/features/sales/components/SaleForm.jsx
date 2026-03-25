import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/shared";
import { Trash2, SquarePlus } from "lucide-react";

const SaleFormPos = ({ children }) => { 

  
  const [listaVenta, setListaVenta] = useState([]);

  const agregarProducto = (producto) => { 

    /*Termina la funcion si el stock es menor a 1 impidiendo
    vender productos menores a cero*/
    if(producto.stock < 1) return;

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
  };
  }
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

  //============================== Vaciar todo el carrito ==================//
  const vaciarCarrito = () => {
    setListaVenta([]);
  };

  return (
    // =================================== Contenedor Padre ==========================//
    <div className="flex h-[80vh] w-full border rounded-2xl overflow-hidden bg-background shadow-xl">

      {/* //=============================== Contenedor Izquierdo ==========================// */}
      <div className="w-2/3 overflow-y-auto bg-gray-50 border-r border-border-strong p-4">
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
        <div>
          {/* <p className="p-2 border-b font-bold text-xs text-text-primary"> Resumen de Factura </p> */}
          <p className="p-2 border-b font-bold text-xs text-text-primary">
            Usuario: Farmaceuta23
          </p>
          <div className="flex justify-between border-b">
              <div>
                <p className="p-2 font-bold text-xs text-text-primary">
                  cliente:
                </p>
              </div>
            <Link  to="/usuariosSale/crear"className="flex text-xs font-bold pr-2 pt-1 items-center">
              Nuevo
              <SquarePlus />
            </Link>
          </div>
          <div className="flex justify-between border-b">
            <p className="p-2 font-bold text-xs text-text-primary">
              Metdo Pago:{" "}
            </p>
            <Link className="text-xs  font-bold mt-2">Efectivo</Link>
            <Link className="text-xs  font-bold mt-2">Tarjeta debito</Link>
            <Link className="text-xs  font-bold mt-2 mr-2">
              Tarjeta Credito
            </Link>
          </div>
        </div>

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
                  <span className="text-xs font-bold uppercase">
                    {item.title}
                  </span>
                  <span className="text-[10px] text-brand font-bold">
                    Cant: {item.cantidad}
                  </span>
                </div>
                <span className="text-sm font-bold">
                  $
                  {(
                    (item.discount || item.price) * item.cantidad
                  ).toLocaleString()}
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
          <div className="flex justify-between items-center mb-4 bg-brand-light border rounded-full border-brand-light px-1">
            <span className="text-small  text-text-primary font-bold ">
              Total a Pagar
            </span>
            <span className="text-body font-black text-brand">
              ${total.toLocaleString()}
            </span>
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
