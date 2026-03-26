export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  children,
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "border border-border bg-[color:var(--color-primary-700)] text-text-inverse hover:bg-brand-hover ",
    secondary:
      "border border-border bg-background text-text-primary hover:bg-brand-light px-4",
  };

  const sizes = {
    sm: `
      h-9 px-3
      before:absolute before:content-['']
      before:-inset-y-[7px] before:-inset-x-[0px]
    `,
    md: `
      h-10 px-4
      before:absolute before:content-['']
      before:-inset-y-[4px] before:-inset-x-[0px]
    `,
    
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      className={`
        relative
        inline-flex items-center justify-center
        rounded-lg
        transition-colors
        cursor-pointer
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantClass}
        ${sizeClass}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
