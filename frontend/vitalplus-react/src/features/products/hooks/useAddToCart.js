import {useOutletContext } from "react-router-dom";
 //======================= AGREGAR AL CARRITO DE COMPRAS ===================
/**
  * El Hook useOutletContext permite  que cualquier componente que se renderize
  * dentro del outlet  puede acceder directamente al estado global del carrito 
  * es decir ya sea la vista homepage o la de detailProductPage puedan utilizar 
  * el estado del carrito  
  */
export const useAddToCart = () => {

    const context = useOutletContext();
    //Si no hay context retorna  un handlercomprar vacio para que no afecte la variante de POS
    if(!context) return { handleComprar: () => {} };
    const { setCartItems, setShowToast, setToastMessage, setToastType, setClose } = context;

    const handleComprar = (e, product) => {
        /*stopPropagation evita que al hacer el evento de click en la card
        redireccione a la vista de detalle porque detiene el evento hacia arriba del DOM */
        if(e) e.stopPropagation();
        /*array que almacena todos los producto seleccionados que van al carrito */
        setCartItems(prev => [...prev, product]);
        /**
         * Actualizan los estados que estan en el MainLayout
         * se selecciona un mensaje y una variante del toast en este caso success
         * muestra los mensajes durante 3 segundos 
         */
        setToastMessage("Producto agregado al carrito");
        setToastType("success");
        setClose(false);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
    };

    return { handleComprar };
    };