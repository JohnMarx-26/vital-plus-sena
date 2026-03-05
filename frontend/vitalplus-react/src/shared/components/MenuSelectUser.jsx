export default function SelectMenu({ 
    titulo,
    opciones = [],
    }
){
    return(
        <div className="w-[215px] h-[48px]" >
            <select
                name={titulo}
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
                    <option key = {option.id} value={option.id}>
                    {option.nombre}
                </option>
                )) 
            };
            </select>
        </div>
    );
};
