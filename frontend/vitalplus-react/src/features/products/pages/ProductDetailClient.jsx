import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button,ZoomImages, formatCurrency} from "@/shared";
import { ShoppingCart, Star, MessageCircleX, FilePenLine, Minus, Plus,} from "lucide-react";
import { UserFormComment } from "@/features/users";
import  {useAddToCart} from "../hooks/useAddToCart";
import  envio  from "@/assets/svg/icono-envioProd.svg";
import  tienda  from "@/assets/svg/icono-recogerTienda.svg";

export default function ProductDetailClient() {
  /*Se accede a la informacion mediante state
    y se desetrucuta en product para poder manipularla 
    en la vista*/
  const { state } = useLocation();
  const product = state?.product;
  const { id, lab, title, image, description, price, discount, presentation, } = product ?? {};
   //==================== Descuento ============================//
  /** 
   * Si la constante tiene valor quiere decir que existe descuento
   * el precio cambia en la card, poniendose mas  pequeño y el discount mas grande y en rojo
   * sino y es falso se mantene solo el precio en el color de la marca
   */
  const hasDiscount = discount && discount > 0;

  //===================== Estado Mostrar Formulario Comentarios ======//
  const [showForm, setShowForm] = useState(false);

  //===================== Estado para los Comentarios ==========//
  const [comments, setComments] = useState([]);

  //=================== Promedio puntuacion producto =============
  const [ratings, setRatings] = useState([]);
  //==================== Carrito =========================//
  const { handleComprar, setCartItems } = useAddToCart();
  //==================== Botones de Cantidad ==============//
  const [isAmount, setAmount] = useState(1);

    // si no hay state o product, retorna el mensaje 
  if (!state || !state.product) {
    return (
      <div className="flex justify-center items-center p-10">
        <p className="text-text-muted">
          No se encontró información del producto.
        </p>
      </div>
    );
  }

  {/* //================ Redirecciona al carrito ================== */}
  const count = ratings.length;
  const sum = ratings.reduce((acc, val) => acc + val, 0);
  const avg = count > 0 ? sum / count : 0;

  const handleRatingSubmit = (commentData) => {
    setRatings((prev) => [...prev, commentData.rating]);
    /*todos los comentarios ya existentes se almacenan en prev
  commentData es el nuevo  comentario que se almacena en el array*/
    setComments((prev) => [...prev, commentData]);
  };

//===================== botones para CANTIDAD ===============

  const handlePlus = () => {
  setAmount(prev => prev + 1);
  setCartItems(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};
  const handleMinus = () => {
  setAmount(prev => (prev > 1 ? prev - 1 : 1));
  setCartItems(prev =>
    prev.map(item =>
      item.id === id
        ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 1 }
        : item
    )
  );
};
  return (
    // ========================== Contenedor Padre ======================
    <div className="flex flex-col gap-1 p-5 justify-center">
      <div className="flex gap-20 justify-center">
        {/* //================ Imagen Producto ================== */}
        {/*El componente ZoomImges que incorpora la capacidad de
        hacer zoom al 100% sobre la parte de la imagen que este apuntando el cursor  */}
        <ZoomImages src={image} />
        {/* //================ laboratorio, nombre, referencia envio ================== */}
        <div className="flex w-100  h-110 flex-col py-7 gap-0.5 ">
          <p className="text-xs">{lab}</p>
          <p className="font-bold mb-2 ">{title}</p>
          <p className="text-xs font-bold m-2">Referencia: {id}</p>

          {/* Mostrar estrellas y promedio */}
          <div className="flex gap-3 p-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={
                  i < Math.round(avg) ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
            <p>{avg.toFixed(1)}</p>
          </div>

          {/* //================= Precio Regular =================== */}
          {/*
           * Se utilizo visible ----- invisible para que la etiqueta no cambie de tamaño
           * si el producto no tiene descuesto haciendo un espacio reservado
           */}
          <div className="flex items-baseline px-2">
            <p
              className={`font-bold leading-none ${
                hasDiscount
                  ? "text-h2 text-text-muted line-through"
                  : "text-h1 text-brand "
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

          <div
            className={`flex ${hasDiscount ? " visible" : "invisible"} px-2`}
          >
            <p
              className={`font-bold text-red-500 pr-2  ${
                hasDiscount ? "text-h1" : "text-h2"
              }`}
            >
              {formatCurrency(discount)}
            </p>
            <span
              className={` 
            flex w-15 h-6 text-xs
          bg-red-600 border rounded-full
            items-center justify-center my-3
            text-text-inverse
            ${hasDiscount ? " visible" : "invisible border-none"}`}
            >
              Oferta
            </span>
          </div>

          <div className="flex p-2 items-center gap-2">
            <img src={envio} className="w-5 h-5" />
            <p className="font-bold text-small">Enviar a casa</p>
            <img src={tienda} className="w-5 h-5 ml-5" />
            <p className="font-bold text-small">Recoger en Tienda</p>
          </div>

          {/* //==================== Botones cantidad producto ============== */}
          <div className="flex gap-10 my-5 items-center ">
            <Button 
            size="amount" 
            onClick={handleMinus} 
            >
              <Minus/>
            </Button>
            <p className=" border rounded font-bold px-10 ">{isAmount}</p>
            <Button
            size="amount" 
            onClick={handlePlus} 
            >
              <Plus/>
            </Button> 
          </div>

          {/* //======================= BOTON agregar Producto ================== */}
          <Button
            variant="detailProduct"
            size="detail"
            onClick={() => handleComprar(null, { ...state.product, quantity: isAmount })}
          >
            <ShoppingCart className="w-5 h-5" />
            Agregar al carrito
          </Button>
        </div>
      </div>
      {/* //================ Informacion del Producto ================== */}
      <div className="flex flex-col py-4 gap-5">
        <p
          className="flex h-8 bg-brand-semiLight text-small font-bold
          items-center rounded-2xl  mt-4 pl-2 "
        >
          Descripción del producto
        </p>
        <p className="pl-2">{description}</p>
      
        <p
          className="flex h-8 bg-brand-semiLight text-small font-bold
          items-center rounded-2xl  mt-4 pl-2 "
        >
          Especificaciones
        </p>
        <div className="grid grid-cols-4 pl-2 gap-1">
        <p className="flex flex-col font-bold">Referencia:</p>
        <p className="flex flex-col font-bold">Laboratorio:</p>
        <p className="flex flex-col font-bold">Nombre:</p>
        <p className="flex flex-col font-bold">Presentación:</p>
        <p className="flex flex-col text-small">{id}</p>
        <p className="flex flex-col text-small">{lab}</p>
        <p className="flex flex-col text-small">{title}</p>
        <p className="flex flex-col text-small">{presentation}</p>
      </div>


        {/* //==================== COMENTARIOS ====================*/}
        <p className="flex h-8 bg-brand-semiLight text-small font-bold
          items-center rounded-2xl  mt-4 pl-2 "
        >
          Comentarios del Producto 
        </p>

        {/* //================== Formulario de creacion de comentario =============== */}
        <div>
          <Button size="xl" onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <MessageCircleX className=" flex w-5 h-5" />
            ) : (
              <FilePenLine className=" flex w-5 h-5" />
            )}
            {showForm ? "Cerrar formulario" : "Crear comentario"}
          </Button>
          {showForm && <UserFormComment onRatingSubmit={handleRatingSubmit} />}
        </div>

           {/* //===================== Impresión de comentarios  Realizados =============== */}
          {comments.map((comment, index) => (
            <div
              className=" flex flex-col bg-brand-light border-brand-semiLight rounded-2xl p-3 gap-1"
              key={index}
            >
              <p className="text-small font-bold">
                {comment.firstName} {comment.lastName}
              </p>
              <p className=" flex text-small gap-2 items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < comment.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
                {comment.rating}
              </p>
              <p className="text-small">{comment.comment}</p>
            </div>
          ))}
    
      </div>
    </div>
  );
}
