export default function Select({
  label,
  name,
  options = [],
}) {
  return (
    <div className="w-full">

      {/* Label */}
      {label && (
        <label className="block text-caption mb-1 text-text-muted">
          {label}
        </label>
      )}

      <select
        name={name}
        className="w-full h-8 rounded-md border border-border px-4 bg-background text-text-primary focus:outline-none focus:ring-2 focus:ring-brand"
      >
        <option value="">
          Seleccione un tipo de documento
        </option>

        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}

      </select>

    </div>
  );
}