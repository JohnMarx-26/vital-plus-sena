export default function Select({
  label,
  name,
  id,
  options = [],
  placeholder = "Seleccione una opción",
  ...props
}) {
  // Si no viene id, usamos el name como id (mejor para formularios)
  const selectId = id || name;

  return (
    <div className="w-[320px]">
      {/* Label */}
      {label && (
        <label
          htmlFor={selectId}
          className="block text-[8px] mb-1 text-text-muted"
        >
          {label}
        </label>
      )}

      {/* Select visual */}
      <select
        id={selectId}
        name={name}
        className="w-full h-8 rounded-md border border-border px-4"
        {...props}
      >
        {/* Opción por defecto */}
        <option value="">{placeholder}</option>

        {/* Opciones dinámicas */}
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}