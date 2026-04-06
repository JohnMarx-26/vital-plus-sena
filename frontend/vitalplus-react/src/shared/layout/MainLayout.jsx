import { Header, Footer, ScrollToTop, Toast} from "@/shared";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";

export default function MainLayout() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  //=================== Contador Carrito ====================
    const [cartItems, setCartItems] = useState([]);
  //======================= TOAST ESTADOS ===========================
  /*los estados indican como debe interactuar  el componente con el DOM
  en este caso el componente es de variante success por lo que el color
   del componente sera diferente y su texto tambien */
  const [showToast, setShowToast] = useState(false);
  const [close, setClose ] = useState(false);
  const [toastType, setToastType] = useState("success");
  const [toastMessage, setToastMessage] = useState("");


  console.log("cartItems:", cartItems);
  return (
    <div className="min-h-screen text-text-primary">

        
        <ScrollToTop /> 
        <header>
        <Header variant="client" cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        </header>

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
          <Outlet context={{ cartItems, setCartItems, setShowToast, setToastMessage, setToastType, setClose }}  />
          <div>{JSON.stringify(cartItems)}</div>
        </main>
        
      ) : (
        <>
        <Outlet context={{ cartItems, setCartItems, setShowToast, setToastMessage, setToastType, setClose }} /> 
        </>
      )}

      {/* ================= Pie de Pagina =================== */}
        <footer>
        <Footer/>
        </footer>
    </div>
  );
}