//Componente utilizado en el formulario de comentarios 
// el formulario se ubica en el detalle de los productos
export default function Textarea({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  className = "",
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="block text-[8px] mb-1 text-text-muted">{label}</label>}
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`
          h-25 w full border rounded p-2 resize-none
          ${error ? "border-red-500" : "border-border"}
          ${className}
        `}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}