import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export default function Input({
  label,
  type = "text",
  id,
  name,
  error,
  ...props
}) {
  const inputId = id || name;
  const isPassword = type === "password";
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword && showPassword ? "text" : type;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-[8px] mb-1 text-text-muted"
        >
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          name={name}
          type={inputType}
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
            ${isPassword ? "pr-12" : ""}
            ${error ? "border-red-500" : "border-border"}
          `}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition"
          >
            {showPassword ? (
              <EyeOff className="size-5" />
            ) : (
              <Eye className="size-5" />
            )}
          </button>
        )}
      </div>

      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
