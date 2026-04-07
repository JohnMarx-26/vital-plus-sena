import { useState } from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { Button, Input, formatCurrency, CheckoutStepper} from "@/shared";
import { CreditCard, Landmark, Smartphone, Package } from "lucide-react";

const METHODS = [
  { id: "card",   label: "Tarjeta",           icon: CreditCard },
  { id: "pse",    label: "PSE",               icon: Landmark },
  { id: "nequi",  label: "Nequi / Daviplata", icon: Smartphone },
  { id: "contra", label: "Contraentrega",     icon: Package },
];

export default function ProductPaymentPage() {
  const { cartItems } = useOutletContext();
  const navigate = useNavigate();
  const [method, setMethod] = useState("card");

  const subTotal        = cartItems.reduce((p, i) => p + i.price * i.quantity, 0);
  const totalItems      = cartItems.reduce((p, i) => p + i.quantity, 0);
  const totalDescuentos = cartItems.reduce((p, i) =>
    i.discount ? p + (i.price - i.discount) * i.quantity : p, 0);
  const total = subTotal - totalDescuentos;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">

      <CheckoutStepper currentStep={2} />

      <div className="flex items-center gap-3 mb-6">
        <h1 className="text-2xl font-bold">Pago y confirmación</h1>
        <span className="text-xs bg-background-secondary text-text-secondary rounded-full px-3 py-1">
          Paso 3
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ===== Izquierda ===== */}
        <div className="flex flex-col gap-4 flex-1">

          {/* Tabs de método */}
          <div className="bg-white border border-brand rounded-xl p-4">
            <p className="text-sm font-bold border-b border-brand pb-3 mb-4">
              Método de pago
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {METHODS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setMethod(id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all text-xs
                    ${method === id
                      ? "border-brand bg-blue-50 text-brand font-bold"
                      : "border-gray-200 text-text-secondary hover:border-brand"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Tarjeta */}
          {method === "card" && (
            <div className="bg-white border border-brand rounded-xl p-4 flex flex-col gap-3">
              <p className="text-sm font-bold border-b border-brand pb-3">
                Datos de la tarjeta
              </p>
              <Input label="Número de tarjeta" name="cardNumber"
                placeholder="1234 5678 9012 3456" maxLength={19} />
              <Input label="Nombre en la tarjeta" name="cardName"
                placeholder="Como aparece en la tarjeta" />
              <div className="flex gap-3">
                <Input label="Vencimiento" name="expiry" placeholder="MM/AA" maxLength={5} />
                <Input label="CVV" name="cvv" placeholder="123" maxLength={4} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-secondary">Cuotas</label>
                <select className="border border-gray-200 rounded-lg px-3 h-10 text-sm">
                  <option>1 cuota (sin interés)</option>
                  <option>3 cuotas</option>
                  <option>6 cuotas</option>
                  <option>12 cuotas</option>
                  <option>24 cuotas</option>
                </select>
              </div>
            </div>
          )}

          {/* PSE */}
          {method === "pse" && (
            <div className="bg-white border border-brand rounded-xl p-4 flex flex-col gap-3">
              <p className="text-sm font-bold border-b border-brand pb-3">Pago por PSE</p>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-secondary">Banco</label>
                <select className="border border-gray-200 rounded-lg px-3 h-10 text-sm">
                  <option value="">Selecciona tu banco</option>
                  <option>Bancolombia</option>
                  <option>Banco de Bogotá</option>
                  <option>Davivienda</option>
                  <option>BBVA</option>
                  <option>Banco Popular</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-text-secondary">Tipo de persona</label>
                <select className="border border-gray-200 rounded-lg px-3 h-10 text-sm">
                  <option>Natural</option>
                  <option>Jurídica</option>
                </select>
              </div>
              <div className="bg-background-secondary rounded-xl p-3 text-xs text-text-secondary">
                Serás redirigido al portal de tu banco para autorizar el pago de forma segura.
              </div>
            </div>
          )}

          {/* Nequi / Daviplata */}
          {method === "nequi" && (
            <div className="bg-white border border-brand rounded-xl p-4 flex flex-col gap-3">
              <p className="text-sm font-bold border-b border-brand pb-3">Nequi / Daviplata</p>
              <Input label="Número de celular" name="phone"
                placeholder="300 000 0000" maxLength={10} />
              <div className="bg-background-secondary rounded-xl p-3 text-xs text-text-secondary">
                Recibirás una notificación push en tu app para aprobar el pago.
              </div>
            </div>
          )}

          {/* Contraentrega */}
          {method === "contra" && (
            <div className="bg-white border border-brand rounded-xl p-4">
              <p className="text-sm font-bold border-b border-brand pb-3 mb-3">
                Pago contraentrega
              </p>
              <div className="bg-background-secondary rounded-xl p-3 text-xs text-text-secondary leading-relaxed">
                <p className="font-bold text-text-primary mb-1">Pagas cuando recibes tu pedido</p>
                Ten el dinero exacto listo. El domiciliario no siempre tiene cambio disponible.
                Solo disponible para pagos en efectivo.
              </div>
            </div>
          )}

        </div>

        {/* ===== Resumen (igual al carrito) ===== */}
        <div className="lg:w-56 w-full flex flex-col gap-3 bg-white border border-brand rounded-xl p-4 sticky top-4">
          <p className="font-bold text-sm border-b border-brand pb-3">Resumen del pedido</p>
          <div className="flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-text-secondary">
              <span>Subtotal ({totalItems} items)</span>
              <span>{formatCurrency(subTotal)}</span>
            </div>
            {totalDescuentos > 0 && (
              <div className="flex justify-between text-red-500">
                <span>Descuentos</span>
                <span>− {formatCurrency(totalDescuentos)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-text-secondary">Envío</span>
              <span className="text-brand font-bold">Gratis</span>
            </div>
          </div>
          <div className="flex justify-between font-bold text-sm border-t border-brand pt-3">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <Button variant="primary" size="md" onClick={() => console.log("confirmar pago")}>
            Confirmar pago
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate("/cart/shipping")}>
            ← Volver
          </Button>
        </div>

      </div>
    </div>
  );
}