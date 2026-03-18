
const CardPOS = ({ product }) => {
  const { id, image, title, lab, stock, price, discount  } = product;

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
    w-full
    max-w-64
    bg-background
    border-border-strong
    text-text-primary
    shadow-md
    rounded-2xl
    overflow-hidden
    hover:shadow-2xl
    transition-all
    duration-300
  "
    >
      <div className="font-bold pl-2 pt-2 text-small">
      {id}
      </div>

      {/* //========= Imagen del producto ============ */}
      <img
        src={image}
        alt={title}
        className="w-full h-36 object-contain bg-backgorund"
      />

      <div className="p-4 space-y-1">

        {/* //=========== Nombre del Producto =========== */}
        <h2 className="text-small font-semibold text-text-primary">{title}</h2>

        {/*//============= Nombre Laboratorio =========== */}
        <h2 className="text-xs text-text-primary">{lab}</h2>

        {/*//=========== Stock del producto (cantidad en inventario) =========== */}
        <h3 className="text-xs font-semibold text-text-primary">Stock: {stock}</h3>

        {/* <p className="text-lg font-bold text-brand">
          ${price.toLocaleString()}
        </p> */}

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
            {" "}
            (Antes){" "}
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
            items-center justify-center
            ${hasDiscount ? " visible" : "invisible border-none"}`}
          >
            Ahora
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardPOS;
