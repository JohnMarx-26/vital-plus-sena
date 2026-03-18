export default function Select({
  label,
  id,
  name,
  value,
  onChange,
  options = [],
  error,
  ...props
}) {
  const selectId = id || name;

  return (
    <div className="w-full min-w-[320px]">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-[8px] mb-1 text-text-muted"
        >
          {label}
        </label>
      )}

      <select
        id={selectId}
        name={name}
        value={value}
        onChange={onChange}
        className={`
          w-full
          h-12
          rounded-md
          border
          px-4
          bg-background
          text-text-primary
          ${error ? "border-red-500" : "border-border"}
        `}
        {...props}
      >
        <option value="">Seleccione una opción</option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}