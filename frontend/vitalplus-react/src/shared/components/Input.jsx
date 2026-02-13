// Creacion de componente input

export default function Input({label, type = "text", ...props}){
    return(
        <div className="w-^[320px]">
            {/* Label */}
            {label &&(
             <label 
                className="
                block
                text-[8px]
                mb-1
                text-gray-600
                "
             >
               {label}
             </label>
            )}

        {/* El contenedor del input */}

        {/* Area interactiva visible(48px) */}

        {/* Input visual */}
        <input 
            type={type} 
            className="
            w-full
            h-12
            rounded-b-md
            border
            border-gray-300
            px-4
            text-base

            focus:right-2
            focus:ring-blue-500
            focus:border-blue-500
            "
            {...props}     
        />
        </div>
    );
}