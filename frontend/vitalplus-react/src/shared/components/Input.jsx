export default function Input({ label, type = "text", id, name, ...props }) {
  const inputId = id || name;

  return (
    <div className="w-full min-w-[320px]">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[12px] mb-1 text-text-muted"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        className="
          w-full
          h-12
          rounded-md
          border
          border-border
          px-4
          text-base
          bg-background
          text-text-primary
          placeholder:text-text-muted
          focus:outline-none
          focus:ring-2
          focus:ring-brand
          focus:border-brand
          disabled:opacity-60
        "
        {...props}
      />
    </div>
  );
}