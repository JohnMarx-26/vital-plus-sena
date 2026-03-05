import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/shared/layout/Navbar";
// import heroBg from "@/assets/images/imagen-hero.jpg";

export default function MainLayout() {

  // ==========
  // useLocation es un Hook de React Router que te da acceso al objeto location, el cual contiene informacion de la URL actual:
  // pathname = La ruta actual(/about, etc)
  // =========

  const location = useLocation();

  const isHome= location.pathname === "/"

  return (

    // Navbar transparente solo en el home
    // Si la ruta es exactamente esta  / => es transparente
    // Si es cualquier otra ruta es solido

    <div className="min-h-screen text-text-primary">
      {/* <div
        className="absolute -z-10 inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      /> */}

      {/* Filtro */}
      {/* <div className="absolute inset-0 -z-10 bg-white/50"> </div> */}

      {/* Navbar */}
        <Navbar variant = {isHome ? "transparent" : "solid"}/>

      {/* Contenido externo que se inyecta  */}
      <main className="mx-auto">
        <Outlet />
      </main>
    </div>
  );
}
