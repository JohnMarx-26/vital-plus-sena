import { Header, Footer, ScrollToTop, Toast} from "@/shared";
import { CartSlide } from "@/features/products";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";


export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  //=================== Contador Carrito ====================
    const [cartItems, setCartItems] = useState([]);
  //=================== CARRITO ====================
    const [isCartOpen, setIsCartOpen] = useState(false);

  //======================= TOAST ESTADOS ===========================
  /*los estados indican como debe interactuar  el componente con el DOM
  en este caso el componente es de variante success por lo que el color
   del componente sera diferente y su texto tambien */
  const [showToast, setShowToast] = useState(false);
  const [close, setClose ] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");


  return (
    <div className="min-h-screen text-text-primary">
      {/* ScrollToTop hace que al abrir la vista todo se mantenga arriba sin que el 
      dom busque etiquetas de titulos o componentes como el footer, navbar */}
      <ScrollToTop />
      <header>
        <Header
          variant="client"
          cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
          onCartClick={() => setIsCartOpen(true)}
        />
      </header>

      <CartSlide
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      {/* //================ Mesaje Productos agregados al carrito ============== */}
      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        close={close}
        onClose={() => setClose(true)}
      />

      {isHome ? (
        <main className="w-full pt-2 pb-6">
          <Outlet
            context={{
              cartItems,
              setCartItems,
              setShowToast,
              setToastMessage,
              setToastType,
              setClose,
            }}
          />
        </main>
      ) : (
        <>
          <Outlet
            context={{
              cartItems,
              setCartItems,
              setShowToast,
              setToastMessage,
              setToastType,
              setClose,
            }}
          />
        </>
      )}

      {/* ================= Pie de Pagina =================== */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
}