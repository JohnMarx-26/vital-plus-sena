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
            w-80
            h-12
            rounded-md
            border
            px-4
            text-base
            bg-background
            text-text-primary
            placeholder:text-text-muted 
            hover:ring
            focus:outline-none
            focus:ring-2
            focus:ring-brand
            focus:border-brand
            disabled:opacity-60
          ${error ? "border-red-500" : "border-border"}
        `}
        {...props}
      >
        <option value="">Seleccione una opción</option>

        {/* {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option> */}
        {options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
