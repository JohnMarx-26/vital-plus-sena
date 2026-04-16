import {Button, formatCurrency} from "@/shared";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function CartSlide ({ isOpen, onClose, cartItems, setCartItems }){

   const subTotal = cartItems.reduce((previo, item) => previo + item.price * item.quantity, 0)

   //=================== Navegacion a otras vistas =============
    const navigate = useNavigate();

    //==================== Eliminar Producto ========================
    const handleEliminar = (index) => {
        setCartItems(prev => prev.filter((_, i) => i !== index));
    };

    //===================== CANTIDADES =======================

     //suma
    const handlePlus = (index) => {
        setCartItems(prev => prev.map((item, i) => 
            i === index ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    //Resta
    const handleMinus = (index) => {
        setCartItems(prev => prev.map((item, i) => 
            i === index ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 } : item
        ));
    };

    return (
      //================ Contenedor padre ====================
    <div
        className={`fixed top-0 right-0 h-full w-80 bg-background z-50 shadow-xl
        flex flex-col transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-3 border-b border-brand mb-2">
        
         {/* //==================  Titulo del carrito ===================0 */}
        <p className="flex w-full text-body font-bold p-2 pl-4">
          Carrito de Compras
        </p>
        {
          <button
            onClick={onClose}
            className="
            top-3 right-3
            text-brand
            hover:text-brand-dark
            transition
            "
          >
            <X className="w-5 h-5" />
          </button>
        }
        </div>

        {/* //==================== Producto agregado ==================== */}
        <div className="flex flex-col overflow-y-auto flex-1 px-3 gap-3">
          {cartItems.map((item, index) => {
            //====================== Estilos descuento ==================== 
            const hasDiscount = item.discount !== undefined && item.discount > 0;
            const fullPrice = hasDiscount ? "text-xs text-text-muted line-through" : "text-xs text-brand";

            return(
            <div key={index} className= "flex w-full border border-brand-dark rounded-lg overflow-hidden shrink-0">
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-20 object-contain mt-1 p-1"
              />
              <div className="flex flex-col justify-center gap-1">
                <p className="text-xs font-bold px-2 py-1">{item.title}</p>
                <p className={fullPrice}>{formatCurrency(item.price)}</p>
                {hasDiscount && 
                <p className="text-xs text-red-600">{formatCurrency(item.discount)}</p>}
               {/* //=================== Botones de Cantidad ============================= */}
                <div className="flex items-center gap-25 mb-1">
                    <div className="flex items-center gap-2">
                        <Button 
                            size="cart" 
                            onClick={() => handleMinus(index)}
                        >
                            <Minus className="w-4 h-4"/>
                        </Button>
                        <p className="text-xs border rounded font-bold px-2">{item.quantity}</p>
                        <Button 
                            size="cart" 
                            onClick={() => handlePlus(index)}
                        >
                            <Plus className="w-4 h-4"/>
                        </Button>
                    </div>
                    <button onClick={() => handleEliminar(index)} className="text-red-500 hover:text-red-700 transition">
                        <Trash2 className="w-5 h-5"/>
                    </button>
                </div>
              </div>  
            </div>
        );
    })}
        </div>
        
        {/* //====================== Contenedor de total y Boton ==================== */}
        <div className="flex flex-col justify-center pt-6 border-t border-brand gap-2 mt-3">
          <div className="flex justify-between p-3 bg-brand-light border border-brand-semiLight rounded-lg mx-2">
            <p className="font-bold">Subtotal</p>
            <p className="text-brand font-bold">{formatCurrency(subTotal)}</p>
          </div>
          <div className="flex justify-center p-1 md-10">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate("/products/cart") && {onClose}}
            >
              Ir a Pagar
            </Button>
          </div>
        </div>
      </div>
    );
}