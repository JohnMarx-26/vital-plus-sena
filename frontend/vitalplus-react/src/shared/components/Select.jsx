export default function Select({
    label,
    name,
    options = [],
    }
){

    return(
        <div className="w-[320px]">
            {/* Si el label tiene ccontenido es igual a  truthy Si no es Falsy y no muestra label */}
            {label &&(

                <label className="text-base mb-1 text-text-muted">  {/* modificar el text por una variable, crearlas */}
                    {label}
                </label>

            )}

            <select 
                name={name} 
                className="
                    w-full
                    h-8
                    rounded-md
                    border
                    border-border
                    px-4
                "
            >
            <option value="">Seleccione un tipo de documento</option>

            {options.map((opt) => (
                <opt key = {opt.id} value ={opt.id}>
                    {opt.label}
                </opt>
            ))
            };
    
            </select>
            
        </div>



    );

};