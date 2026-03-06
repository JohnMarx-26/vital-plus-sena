import { Search, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Navbar = () => {
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

  return (
    <nav
      className="
        w-full
        border-b
        border-[color:var(--color-primary-800)]
        bg-[color:var(--color-primary-700)]
        text-[color:var(--color-basic-white)]
        relative
        z-50
      "
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
          
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Vital-Plus
            </Link>
          </div>

         
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link to="/" className="hover:opacity-90 transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/cursos" className="hover:opacity-90 transition">
                Cursos
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:opacity-90 transition">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/videos" className="hover:opacity-90 transition">
                Video
              </Link>
            </li>
          </ul>

          
          <div className="flex items-center gap-4">
           
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/80" />
              <input
                type="text"
                placeholder="Buscar..."
                className="
                  pl-9 pr-4 py-2
                  rounded-lg
                  border border-white/30
                  bg-white/10
                  text-white
                  placeholder:text-white/70
                  focus:outline-none
                  focus:ring-2 focus:ring-white/60
                "
              />
            </div>

            
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
                            to="/usuarios/editar"
                            className="block px-4 py-2 hover:bg-surface transition"
                            onClick={() => setIsOpen(false)}
                          >
                            Editar datos
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
    </nav>
  );
};

export default Navbar;