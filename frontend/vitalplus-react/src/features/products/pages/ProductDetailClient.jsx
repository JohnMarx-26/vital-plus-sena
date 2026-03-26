import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/shared";
import  envio  from "@/assets/svg/icono-envioProd.svg";
import  tienda  from "@/assets/svg/icono-recogerTienda.svg";

export default function ProductDetailClient() {
  /*Se accede a la informacion mediante state
    y se desetrucuta en product para poder manipularla 
    en la vista*/
  const { state } = useLocation();
  const { lab, title, image, description, price, discount} = state.product;


  {/* //================ Redirecciona al carrito ================== */}
  const handleComprar = (producto) => {
  console.log("Agregando al carrito:", producto);
  };

  //==================== Descuento ============================//
  /**
   * Si la constante tiene valor quiere decir que existe descuento
   * el precio cambia en la card poniendose mas  pequeño y el discount mas grande y en rojo
   * sino y es falso se mantene solo el price en el color de la marca
   */
  const hasDiscount = discount && discount > 0;


  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
  const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - left) / width) * 100;
  const y = ((e.clientY - top) / height) * 100;
  setPosition({ x, y });
};

  return (
    // ===========================Contenedor Padre ======================
    <div className="flex mx-auto  gap-5 p-5 justify-center">

      {/* //================ Imagen Producto ================== */}
      <div className="h-85 w-85 overflow-hidden rounded-xl cursor-zoom-in" 
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      >
        <img  className="
          w-full h-full 
          object-contain 
          transition-transform 
          duration-200" 
          src={image}
          
          style={{
          transformOrigin: `${position.x}% ${position.y}%`,
          transform: isHovered ? 'scale(2)' : 'scale(1)',
          }}
          
          />
      </div>

      {/* //================ Informacion del Producto ================== */}
      <div className="flex flex-col h-110 w-92  border-border items-center py-11">
        <div className=" w-full h-12 p-1 ">
          <h4 className="text-xs">{lab}</h4>
          <h3 className="font-bold ">{title}</h3>
        </div>
        <div className="p-1 border-border text-small ">
          <h3 className="flex h-8 bg-brand text-small text-background items-center pl-1">Información</h3>
          {description}
        </div>
      </div>


      <div className="flex w-60  h-70 flex-col py-11  border rounded-2xl mt-10">
          {/* //================= Precio Regular =================== */}
        {/*
         * Se utilizo visible ----- invisible para que la etiqueta no cambie de tamaño
         * si el producto no tiene descuesto haciendo un espacio reservado
         */}
        <div className="flex items-baseline px-2">
          <p
            className={`font-bold leading-none ${
              hasDiscount
                ? "text-body text-text-muted line-through"
                : " text-h2 text-brand "
            }`}
          > 
            ${price.toLocaleString()}
          </p>

          <span
            className={`text-xs text-text-muted ${
              hasDiscount ? "visible" : "invisible"
            }`}
          >
            (Antes)
          </span>
        </div>

        {/* //================ Precio con Descuento =============== */}
        {/*
         * Se utilizo hasDiscount en la etiqueta <p> para  que cambie el tamaño
         * de la fuente a text-small si este no tiene descuento, permitiendo
         * uniformidad por espacio reservado
         */}

        <div className={`flex ${hasDiscount ? " visible" : "invisible"} px-2`}>
          <p
            className={`font-bold text-red-500 pr-2  ${
              hasDiscount ? "text-h2" : "text-small"
            }`}
          >
            ${discount?.toLocaleString()}
          </p>
          <span
            className={` 
            flex w-15 h-6 text-xs
          bg-red-600 border rounded-full
            items-center justify-center mt-1
            text-text-inverse
            ${hasDiscount ? " visible" : "invisible border-none"}`}
          >
            Oferta
          </span>
        </div>

        <div className="flex flex-col py-5 px-2">

          <div className="flex gap-2 py-2">
            <img src={envio} className="w-5 h-5"/>
            <p className="font-bold text-small">Envio Rush</p>
          </div>  

          <div className="flex gap-2 py-2">
            <img src={tienda} className="w-5 h-5"/>
            <p className="font-bold text-small">Recoger en Tienda</p>
          </div>  

        </div>

        {/* //================ BOTON agregar Producto =============== */}
        <div className="flex justify-center">
          <Button
            className="
              w-50 
              text-background 
              text-small
              border rounded-full 
              gap-2 justify-center
              py-2 px-2
              mt-3
              "
            onClick={() => handleComprar(state.product)}>
              Agregar al carrito
          </Button>
          </div>
      </div>
    </div>
  );
}
