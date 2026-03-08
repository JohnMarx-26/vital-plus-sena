import { useNavigate } from "react-router-dom";

export default function DropDown({data}){

    const navegacion = useNavigate();

    return (
        <div>
            {data.map((grupo, i)=>(
                <div key={i}>
                    <h3>{grupo.titulo}</h3>
                    <ul>
                        {grupo.opciones.map(op => (
                            <li
                                key={op.id}
                                className="cursor-pointer hover:text-brand"
                                onClick={() => navegacion(op.ruta)}
                            >
                                {op.nombre}
                            </li>    
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
}
