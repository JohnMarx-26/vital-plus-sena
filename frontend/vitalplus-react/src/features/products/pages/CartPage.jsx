import { useOutletContext, useNavigate } from "react-router-dom";
import { Button, formatCurrency,CheckoutStepper } from "@/shared";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { cartItems, setCartItems } = useOutletContext();
  const navigate = useNavigate();

  const subTotal = cartItems.reduce((prev, item) => prev + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((prev, item) => prev + item.quantity, 0);
  const totalDescuentos = cartItems.reduce((prev, item) => {
    return item.discount ? prev + (item.price - item.discount) * item.quantity : prev;
  }, 0);
  const total = subTotal - totalDescuentos;

  const handleEliminar = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handlePlus = (index) => {
    setCartItems(prev => prev.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const handleMinus = (index) => {
    setCartItems(prev => prev.map((item, i) =>
      i === index ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
    ));
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShoppingCart className="w-10 h-10 text-text-muted"/>
        <p className="text-h3 font-bold text-text-muted">Tu carrito está vacío</p>
        <Button variant="primary" size="md" onClick={() => navigate("/")}>
          Seguir comprando
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-2">

       {/* ===== Título ===== */}
      <div>
        <h1 className="flex justify-center
            text-brand font-bold
            text-h2
            mt-12
            mb-5
            "
        >
          Carrito de compras</h1>
      </div>


      {/* //========= Pasos del carrito ====== */}
      <div className="flex px-10">
      <CheckoutStepper currentStep={0} />
      </div>
      <div className="flex flex-col lg:flex-row gap-6 items-start">

        {/* ===== Lista de productos ===== */}
        <div className="flex flex-col gap-3 flex-1">
          {cartItems.map((item, index) => {
            const hasDiscount = item.discount !== undefined && item.discount > 0;

            return (
              <div key={index} className="flex gap-3 bg-white border border-brand rounded-xl p-3">

                {/* Imagen */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain rounded-lg bg-background-secondary p-1 shrink-0"
                />

                {/* Info */}
                <div className="flex flex-col justify-between flex-1">
                  <p className="text-sm font-bold">{item.title}</p>

                  {/* Precios */}
                  <div className="flex items-center gap-2">
                    {hasDiscount ? (
                      <>
                        <span className="text-xs text-text-muted line-through">
                          {formatCurrency(item.price)}
                        </span>
                        <span className="text-sm font-bold text-red-500">
                          {formatCurrency(item.discount)}
                        </span>
                      </>
                    ) : (
                      <span className="text-sm font-bold text-brand">
                        {formatCurrency(item.price)}
                      </span>
                    )}
                  </div>

                  {/* Controles */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button size="cart" onClick={() => handleMinus(index)}>
                        <Minus className="w-4 h-4" />
                      </Button>
                      <p className="text-xs border rounded font-bold px-2">{item.quantity}</p>
                      <Button size="cart" onClick={() => handlePlus(index)}>
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                    <button
                      onClick={() => handleEliminar(index)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* ===== Resumen del pedido ===== */}
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

            <div className="flex justify-between text-brand-dark">
              <span>Envío</span>
              <span className="text-brand font-bold">Gratis</span>
            </div>
          </div>

          {/* Total */}
          <div className="flex justify-between font-bold text-sm border-t border-brand pt-3">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>

          <Button variant="primary" size="md" onClick={() => navigate("/cart/shipping")}>
            Proceder al Pago
          </Button>
          <Button variant="secondary" size="md" onClick={() => navigate("/")}>
            Seguir comprando
          </Button>
        </div>

      </div>
    </div>
  );
}