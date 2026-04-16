import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Select, formatCurrency,Input} from "@/shared";
import { Trash2, SquarePlus, ChevronDown, BanknoteArrowDown } from "lucide-react";
import  usuario from "@/assets/svg/icono-usu-dark.svg";
import { getBancos } from "../services/getBancos";
import { getMetodosPago } from "../services/getMetodosPago";
import { createVenta } from "../services/createVenta";
import { getClienteByDocumento } from "../services/getClienteByDocumento";

const SaleFormPos = ({ children }) => { 

  //estado para el metodo de pago y Bancos
const [metodosPago, setMetodosPago] = useState([]);
const [bancos, setBancos] = useState([]);
const [metodoPago, setMetodoPago] = useState("");
const [banco, setBanco] = useState("");

//estados del cliente
const [documento, setDocumento]   = useState("");
const [nombre, setNombre]         = useState("");
const [correo, setCorreo]         = useState("");
const [cargando, setCargando]     = useState(false);

//buscar cliente por Numero de identificacion
const [clienteId, setClienteId] = useState(null);
const [buscandoCliente, setBuscandoCliente] = useState(false);

  // fetch para los selects 
useEffect(() => {
  getBancos().then((data) => { setBancos(data); });
  getMetodosPago().then((data) => {  setMetodosPago(data); });
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


//handle para crear venta de cliente y guardar los datos en el back
const handleFinalizarVenta = async () => {
  // Validaciones básicas
  if (!metodoPago) {
    alert("Selecciona un método de pago");
    return;
  }
  if (!documento || !nombre) {
    alert("Ingresa el documento y nombre del cliente");
    return;
  }
  if (!clienteId) {
    alert("Busca un cliente válido por documento antes de continuar");
    return;
  }
  if (listaVenta.length === 0) {
    alert("Agrega al menos un producto");
    return;
  }

  setCargando(true);

  try {
    const resultado = await createVenta({
      id_cliente:    clienteId,           // temporal hasta tener tabla clientes
      id_funcionario: 3,           // temporal hasta tener auth
      id_metodo_pago: Number(metodoPago),
      items: listaVenta.map((item) => ({
        id_inventario: item.id_inventario, // asegúrate que el producto lo trae
        cantidad:      item.cantidad,
        subtotal:      parseFloat(
          ((item.discount || item.price) * item.cantidad).toFixed(2)
        ),
      })),
      subtotal: parseFloat(subtotal.toFixed(2)),
      iva:      parseFloat(iva.toFixed(2)),
      total:    parseFloat(total.toFixed(2)),
    });

    alert(`✅ Venta registrada — Factura N° ${resultado.numero_factura}`);
    vaciarCarrito();
    setDocumento("");
    setNombre("");
    setCorreo("");
    setMetodoPago("");
    setBanco("");
    setClienteId(null);

  } catch (error) {
    alert(`❌ Error al registrar la venta: ${error.message}`);
  } finally {
    setCargando(false);
  }
};

const handleBuscarCliente = async () => {
  if (!documento.trim()) return;

  setBuscandoCliente(true);
  try {
    const cliente = await getClienteByDocumento(documento.trim());

    if (!cliente) {
      alert("❌ Cliente no encontrado. Regístralo primero con el botón 'Nuevo'.");
      setNombre("");
      setCorreo("");
      setClienteId(null);
      return;
    }

    // Mapeo a los campos reales de la tabla
    setNombre(`${cliente.nombres_cliente} ${cliente.apellidos_cliente}`);
    setCorreo(cliente.correo_electronico ?? "");
    setClienteId(cliente.id_cliente);

  } catch {
    alert("❌ Error al buscar el cliente");
  } finally {
    setBuscandoCliente(false);
  }
};


console.log("banco seleccionado:", banco, typeof banco);
console.log("metodosPago:", metodosPago);
console.log("filtrados:", metodosFiltrados);
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
            <div className="flex  justify-between px-2 my-1 p-2 gap-2">
              <div>
                {/* Documento — buscador */}
                <div className="flex items-end gap-1">
                  <Input
                    label="Documento de Identidad"
                    value={documento}
                    onChange={(e) => {
                      setDocumento(e.target.value);
                      setClienteId(null);
                      setNombre("");
                      setCorreo("");
                    }}
                    onKeyDown={(e) =>
                      e.key === "Enter" && handleBuscarCliente()
                    }
                  />
                  <Button
                    onClick={handleBuscarCliente}
                    disabled={buscandoCliente || !documento.trim()}
                    className="mb-1 bg-brand text-background text-xs font-bold px-2 py-1 rounded-lg disabled:opacity-50"
                  >
                    {buscandoCliente ? "..." : "Buscar"}
                  </Button>
                </div>

                {/* Nombre — readonly */}
                <Input
                  label="Nombre del usuario"
                  value={nombre}
                  readOnly
                  className="bg-red-50 text-text-muted cursor-not-allowed"
                />

                {/* Correo — readonly */}
                <Input
                  label="Correo del usuario"
                  value={correo}
                  readOnly
                  className="bg-red-50 text-text-muted cursor-not-allowed"
                />
              </div>

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
              onClick={handleFinalizarVenta}
              disabled={listaVenta.length === 0 || cargando}
              className="bg-brand text-small text-background py-4 rounded-xl font-bold hover:brightness-110 disabled:opacity-50 transition-all"
            >
              {cargando ? "Procesando..." : "Finalizar Venta"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleFormPos;
