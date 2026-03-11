export default function Select({
  label,
  name,
  options = [],
  value = "",
  onChange,
}) {
  return (
    <div className="w-[320px]">
      {label && (
        <label
          className="
            block
            text-[8px]
            mb-1
            text-text-primary
          "
        >
          {label}
        </label>
      )}

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full h-12 rounded-md border border-border px-4 text-body"
      >
        <option value="">Seleccione una opción</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}