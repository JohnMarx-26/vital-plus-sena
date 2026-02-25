// Creacion de componente input

export default function Input({label, type = "text", ...props}){
    return (
      <div className="w-[320px]">
        {/* Label */}
        {label && (
          <label
            className="
                block
                text-[8px]
                mb-1
                text-[var(--color-basic-500)]
                "
          >
            {label}
          </label>
        )}

        {/* El contenedor del input */}
        <div
          className="
          relative
          h-12
          flex
          items-center
         "
        >
          {/* Area interactiva invisible(48px) */}

          <div
            className="
            absolute
            inset-0
            "
           onMouseDown = {(e) =>{
            e.preventDefault();
            e.currentTarget.nextSibling.focus();
            }}
           
          />

          {/* Input visual */}
          <input
            type={type}
            className="
            relative
            w-full
            h-8
            rounded-md
            border
            border-var(--color-basic-200)
            px-4
            text-base
            
            focus:outline-none
            focus:ring-2
            focus:ring-var(--color-primary-600)
            focus:border-var(--color-primary-600)
            "
            {...props}
          />
        </div>
      </div>
    );
}