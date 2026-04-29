import Button  from "./Button";
import {formatCurrency} from "@/shared";
import agregar from "@/assets/svg/icono-add-light.svg";

const CardClient = ({ variant, product, onComprar, onSelectProduct, }) => {
  const { id, lab, title, image, stock, price, discount,} = product;

  //==================== Descuento ============================//
  /**
   * Si la constante tiene valor quiere decir que existe descuento
   * el precio cambia en la card poniendose mas  pequeño y el discount mas grande y en rojo
   * sino y es falso se mantene solo el price en el color de la marca
   */
  const hasDiscount = discount && discount > 0;
  
  //==================== Stock en 0 VISTA FARMACEUTA============================//
  // Cuando el stock llegue a cero cambia el color de fondo de la card
  // y el texto de stock se pondra de color rojo
  const notStock = stock == 0;

  //==================== Tamaño de la Card====================//
  /**
   * Se crea una variable que pasa como argumento en el div contenedor
   * para asi de manera dinamica dependiendo de la variante, la card
   * tenga un tamaño u otro
   */

  const variantCard ={ 

  client: `
    p-1
    w-80
    h-95
    max-w-68
    bg-background
    text-text-primary
    shadow-md
    rounded-2xl
    overflow-hidden
    hover:shadow-2xl
    transition-all
    duration-300
    ${notStock ? "disable" : "bg-white"}
    `
    ,
  
    pos: `
    w-47
    bg-background
    border-border-strong
    text-text-primary
    shadow-md
    rounded-2xl
    overflow-hidden
    hover:shadow-2xl
    transition-all
    duration-300
    ${notStock ? "bg-background-md " : "bg-white"}
  `
  };

  return (
    
    <div className={variantCard[variant]}
    
    onClick={() => onSelectProduct?.(product)}

    >
      
      {/* //========= ID del producto ============ */}
      <div className={`${variant === "client" ? "hidden" : "font-bold pl-2 pt-2 text-small"}`}>
        {id}
      </div>

      {/* //========= Imagen del producto ============ */}
      <img
        src={image}
        alt={title}
        className={`${variant === "client" 
          ? "w-full h-44 object-contain bg-background" 
          :  "w-full h-36 object-contain bg-backgorund"
        }`} 
      />

      <div className="p-4 space-y-1">

        <div className="flex flex-col ">
        {/*//============= Nombre Laboratorio =========== */}
        <p className="text-xs font-semibold text-text-primary">{lab}</p>

        {/* //=========== Nombre del Producto =========== 
        // line-clamp-2 hace que se utilicen dos lineas maximo para el texto
        // si el texto es mas largo lo recorta y pone ...
        
        min-h-10 === min-h-[2.5rem] esto hace que el titulo asi sea mas corto
        tenga el espacio reservado de las dos lienas para poder generar uniformidad*/}
        <p className="text-small font-semibold text-brand line-clamp-2 min-h-10">{title}</p>
        </div>
        {/* //================= Precio Regular =================== */}
        {/*
         * Se utilizo visible ----- invisible para que la etiqueta no cambie de tamaño
         * si el producto no tiene descuesto haciendo un espacio reservado
         */}
        <div className="flex items-baseline ">
          <p
            className={`font-bold leading-none ${
              hasDiscount
                ? "text-small text-text-muted line-through"
                : " text-body text-brand "
            }`}
          >
            {formatCurrency(price)}
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

        <div className={`flex ${hasDiscount ? " visible" : "invisible"}`}>
          <p
            className={`font-bold text-red-600 pr-2  ${
              hasDiscount ? "text-body" : "text-small"
            }`}
          >
            {formatCurrency(discount)}
          </p>
          <span
            className={` 
            flex w-15 h-6 text-xs
          bg-red-600 border rounded-full
            items-center justify-center
            text-text-inverse
            ${hasDiscount ? " visible" : "invisible border-none"}`}
          >
            Oferta
          </span>
        </div>

      {/* //=============== Variante Card Venta POS =================
        card SIN boton de comprar, con cantidad de Stock
        si el stock llega a cero el stock pasara a color rojo
        para punto de venta, vista farmaceuta */}
      {variant === "pos" && ( 
        <>
        <p className={` ${notStock 
        ? "text-xs font-semibold text-red-700"
        : "text-xs font-semibold text-text-primary"}`}>Stock: {stock}</p>
        </>
      )}

      {/* //=============== Variante Card E-commers =================

      // boton de comprar */}
      {variant === "client" && (
      //=============== AGREGAR al carrito =================
        <Button
        className="
        w-full 
        text-background 
        text-small
        border rounded-full 
        gap-2 justify-center
        py-2 px-2
        mt-3
        "
        onClick={(e) => onComprar(e)}
        >
          Comprar
          <img src={agregar} alt="icono-agregar" className="h-5 w-5" />
        </Button>
      )}
      </div>
    </div>
  );
};

export default CardClient;
