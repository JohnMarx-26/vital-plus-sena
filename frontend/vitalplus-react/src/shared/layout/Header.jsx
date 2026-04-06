import { Search, User, ShoppingCart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/shared";
import logo from "@/assets/svg/logo-Header.svg";
import campana from "@/assets/svg/campana.svg";

const Header = ({ variant = "client", cartCount }) => {

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [isAuth, setIsAuth] = useState(false);
  const [userName, setUserName] = useState("");

  const syncAuth = () => {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("userName");
    setIsAuth(!!token);
    setUserName(name || "Usuario");
  };

  useEffect(() => {
    syncAuth();

    const handler = () => syncAuth();
    window.addEventListener("auth-changed", handler);

    return () => window.removeEventListener("auth-changed", handler);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    window.dispatchEvent(new Event("auth-changed"));
    setIsOpen(false);
    navigate("/");
  };

  /*Dependiendo la variante se muestra un icono diferente
  client ===> variante para el e-commers
  Main ====> variante para el administrador y el farmaceuta*/
  const headerVariants = {
  client: {
    icon:
    <div className="relative">
        <Button>
          <ShoppingCart alt="carrito" className="h-6 w-6" />
        </Button>
        {cartCount > 0 && (
          <span
            className="absolute -top-2 -right-2
          bg-red-500 text-text-inverse
            text-xs font-bold px-2 
            py-0.5 rounded-full"
          >
            {cartCount}
          </span>
        )}
      </div>,
  },
  Main: {
    icon: <img src={campana} alt="notificaciones" className="h-6 w-6" />,
  },
};

  const { icon } = headerVariants[variant];

  return (
    <div
      className="
        w-full
        border-b
        border-brand
        bg-brand
        text-text-inverse
        relative
        z-50
      "
    >
      <div className= "mx-auto max-w-7xl px-4" >
        <div className={`flex h-16 items-center ${variant==="client" ? "gap-4" : "gap-4 "}`}>
          {/* //==================== LOGO ==================== */}
          <div className="w-40 shrink-0 flex items-center">
            <Link
              to="/"
              className="flex items-center gap-1 text-boddy font-bold"
            >
              <img src={logo} alt="Logo-vitalPlus" className="w-10 h-10" />
              <span>Vital-Plus</span>
            </Link>
          </div>

          {/* //==================== BARRA DE BUSQUEDA ==================== */}
          <div className={`flex-1 flex justify-center ${variant==="client" ? "visible" : "invisible"}`}>
            <div className="relative w-full max-w-125">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
              <input
                type="text"
                placeholder="Buscar..."
                className="
                  w-full
                  pl-10 pr-4 py-2
                  rounded-full
                  border border-white/30
                  bg-white
                  text-slate-700
                  placeholder:text-slate-400
                  focus:outline-none
                  focus:ring-2 focus:ring-white/60
                "
              />
            </div>
          </div>

          {/* //=================== Variantes (carrito --- campana ) ============== */}
          {icon}

          {/* //========================  MENU DE USUARIO ========================*/}
          <div className=" shrink-0 flex items-center justify-end">
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center size-10 rounded-full border border-white/30 hover:bg-white/10 transition"
              >
                <User className="size-5" />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg border border-border bg-background text-text-primary shadow-lg overflow-hidden">
                  <div className="px-4 py-3 border-b border-border">
                    <p className="text-sm text-text-muted">Sesión</p>
                    <p className="font-semibold">
                      {isAuth ? userName : "Invitado"}
                    </p>
                  </div>

                  <ul className="py-2 text-sm">
                    {!isAuth ? (
                      <li>
                        <Link
                          to="/login"
                          className="block px-4 py-2 hover:bg-surface transition"
                          onClick={() => setIsOpen(false)}
                        >
                          Iniciar sesión
                        </Link>
                      </li>
                    ) : (
                      <>
                        <li>
                          <Link
                            to="/dashboard"
                            className="block px-4 py-2 hover:bg-surface transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Home (logeado)
                          </Link>
                        </li>

                        <li>
                          <Link
                            to="/usuarios/detalles"
                            className="block px-4 py-2 hover:bg-surface transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Visualizar usuario
                          </Link>
                        </li>

                        <li>
                          <button
                            className="w-full text-left px-4 py-2 hover:bg-surface transition"
                            onClick={handleLogout}
                          >
                            Cerrar sesión
                          </button>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;