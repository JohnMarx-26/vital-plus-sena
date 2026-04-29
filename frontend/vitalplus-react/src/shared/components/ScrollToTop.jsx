import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// esta funcion resetea el scroll del router/index.js cuando pasa entre vistas
// Se utiliza principalmente en detalle del producto y las vistas de formularios
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}