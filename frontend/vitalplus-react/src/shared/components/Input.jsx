// Creacion de componente input
export default function Input({ label, type = "text", id, name, ...props }) {
  // Si no viene id, usamos el name como id (mejor para formularios)
  const inputId = id || name;

  return (
    <div className="w-[320px]">
      {/* Label */}
      {label && (
        <label
          htmlFor={inputId}
          className="
            block
            text-[8px]
            mb-1
            text-text-muted
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
          onMouseDown={(e) => {
            e.preventDefault();
            e.currentTarget.nextSibling.focus();
          }}
        />

        {/* Input visual */}
        <input
          id={inputId}
          name={name}
          type={type}
          className="
            relative
            w-full
            h-8
            rounded-md
            border
            border-border
            px-4
            text-base

            focus:outline-none
            focus:ring-2
            focus:ring-brand
            focus:border-brand
          "
          {...props}
        />
      </div>
    </div>
  );
}