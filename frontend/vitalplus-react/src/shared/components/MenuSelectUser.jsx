import { useNavigate } from "react-router-dom";

export default function SelectMenu({ 
    titulo,
    opciones = [],
    }
)
{
    const  navegacion = useNavigate();

    const handleChange = (event) => {
        const rutaSeleccionada = event.target.value;
        if(rutaSeleccionada){
            navegacion(rutaSeleccionada);
        }
    };
    return(
        <div className="w-[215px] h-[48px]" >
            <select
                name={titulo}
                onChange={handleChange}
                className="
                    w-full
                    h-10
                    rounded-md
                    border
                    border-brand
                    bg-brand
                    text
                    hover:bg-brand-hover
                "
            >
            <option>{titulo}</option>
                {opciones.map((option)=> ( 
                    <option key = {option.id} value={option.ruta}>
                    {option.nombre}
                </option>
                )) 
            };
            </select>
        </div>
    );
};
