/**
 * createPortal permite renderizar un componente fuera del arbol del
 * DOM donde fue invocado, pero manteniendo la misma logica y estado de
 * react en otras palabras aunque se declare el componente, este de dibuja
 * directamente en el  body o algun otro nodo del DOM 
*/
import { createPortal } from "react-dom";
import { X } from "lucide-react";

export default function Toast({ 
    message,
    type = "success",
    show ,
    close,
    onClose,
}) {
    if (!show || close) return null; 

    const defaultStyle =
        "fixed top-20 right-4 z-50 px-4 py-2 text-small rounded shadow transition-opacity duration-200";
    const variant = {
        success: "bg-secondary-semiLight text-text-inverse",
        error: "bg-red-600 text-white",
        warning: "bg-yellow-500 ",
        info: "bg-brand text-white",
    };

    return createPortal(
        <div
        className={`flex gap-3 ${defaultStyle} ${variant[type]} ${
            /*pointer-events-auto permite generar los clicks automaticamente
            pointer-events-none permite que el toast siga en el DOM pero los 
            clikcs lo atraviesen ejemplo de esto hacer click en el dropdown 
            del login despues de que desaparezca el Toast de la pantalla */
            show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        >
        {message}
        {<button
            onClick={onClose}
            className="
            top-3 right-3
            text-text-inverse
            hover:text-brand-dark
            transition
            "
        >
            <X className="w-5 h-5"/>
        </button>
        }
        </div>,
        //Se dibuja direacmente en el body y no el componente o vista donde se importe
        document.body
    );
}
