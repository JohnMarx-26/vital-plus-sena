import Button  from "./Button";
import agregar from "@/assets/svg/icono-add-light.svg";

const CardClient = ({ product }) => {
  const { lab, title, image, price, discount } = product;

  //==================== Descuento ============================//
  /**
   * Si la constante tiene valor quiere decir que existe descuento
   * el precio cambia en la card poniendose mas  pequeño y el discount mas grande y en rojo
   * sino y es falso se mantene solo el price en el color de la marca
   */
  const hasDiscount = discount && discount > 0;

  return (
    <div
      className="
    w-80
    h-98
    max-w-68
    bg-background
    text-text-primary
    shadow-md
    rounded-2xl
    overflow-hidden
    hover:shadow-2xl
    transition-all
    duration-300
  "
    >
      {/* //========= Imagen del producto ============ */}
      <img
        src={image}
        alt={title}
        className="w-full h-44 object-contain bg-background"
      />

      <div className="p-4 space-y-2">
        
        {/*//============= Nombre Laboratorio =========== */}
        <h2 className="text-small font-semibold text-text-primary">{lab}</h2>

        {/* //=========== Nombre del Producto =========== */}
        <h2 className="text-small font-semibold text-brand">{title}</h2>

        {/* //================= Precio Regular =================== */}
        {/*
         * Se utilizo visible ----- invisible para que la etiqueta no cambie de tamaño
         * si el prodcuto no tiene descuesto haciendo un espacio reservado
         */}
        <div className="flex items-baseline ">
          <p
            className={`font-bold leading-none ${
              hasDiscount
                ? "text-small text-text-muted line-through"
                : " text-body text-brand "
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

        <div className={`flex ${hasDiscount ? " visible" : "invisible"} gap-4`}>
          <p
            className={`font-bold text-red-500 pr-2  ${
              hasDiscount ? "text-body" : "text-small"
            }`}
          >
            ${discount?.toLocaleString()}
          </p>
          <span
            className={` 
            flex w-15 h-6 text-xs
          bg-red-400 border rounded-full
            items-center justify-center text-text-inverse
            ${hasDiscount ? " visible" : "invisible border-none"}`}
          >
            Oferta
          </span>
        </div>

        {/* //=============== AGREGAR al carrito =================*/}
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
        >
          Comprar
          <img src={agregar} alt="icono-agregar" className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default CardClient;
