import { Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar = ({ variant = "solid" }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className={`w-full border-b transition-colors duration-300 ${
        variant === "transparent"
          ? "bg-transparent border-transparent absolute top-0 left-0 z-30"
          : "bg-background border-border"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Rico Programar
            </Link>
          </div>

          {/* Links */}
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link to="/" className="hover:text-brand transition">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/cursos" className="hover:text-brand transition">
                Cursos
              </Link>
            </li>
            <li>
              <Link to="/contacto" className="hover:text-brand transition">
                Contacto
              </Link>
            </li>
            <li>
              <Link to="/videos" className="hover:text-brand transition">
                Video
              </Link>
            </li>
          </ul>

          {/* Right section */}
          <div className="flex items-center gap-4">

            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-muted" />

              <input
                type="text"
                placeholder="Buscar..."
                className="pl-9 pr-4 py-2 border border-border rounded-lg text-body focus:outline-none focus:ring-2 focus:ring-brand"
              />
            </div>

            {/* User menu */}
            <div className="relative">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-center size-10 rounded-full border border-border hover:bg-surface transition"
              >
                <User className="size-5" />
              </button>

              {isOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-background shadow-lg">
                  <ul className="py-2 text-sm">

                    <li>
                      <Link
                        to="/perfil"
                        className="block px-4 py-2 hover:bg-surface transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Perfil
                      </Link>
                    </li>

                    <li>
                      <Link
                        to="/login"
                        className="block px-4 py-2 hover:bg-surface transition"
                        onClick={() => setIsOpen(false)}
                      >
                        Iniciar sesión
                      </Link>
                    </li>

                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-surface transition"
                        onClick={() => {
                          setIsOpen(false);
                          console.log("Cerrar sesión");
                        }}
                      >
                        Cerrar sesión
                      </button>
                    </li>

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