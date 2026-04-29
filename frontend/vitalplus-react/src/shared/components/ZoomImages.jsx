
//========================= Efecto de Zoom productos ============================//
  /** 
   * el estado position conoce en x y en y la posicion del punturo ambos comienzan en cero
   * el estado isHobered conoce si el puntero esta sobre la imagen:
   * false cuando sale de la imagen
   * true cuando esta dentro de la imagen 
   * handleMouseMove tanto con X como en Y hace zoom x 100 a la parte de la imagen que position
   * esta detectando haciendo el efecto de lupa zoom
   */

import { useState } from "react";

export default function ZoomImage({ src }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      className="h-100 w-120 overflow-hidden rounded-xl cursor-zoom-in"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        className="w-full h-full object-contain transition-transform duration-200"
        src={src}
        style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: isHovered ? "scale(2)" : "scale(1)",
        }}
      />
    </div>
  );
}