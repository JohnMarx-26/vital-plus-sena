import { useState, useEffect } from "react";
import { Check, X, Clock3, AlertCircle } from "lucide-react";

export default function StatusSwitch({
  checked = 0,
  onChange,
  disabled = false,
  size = "md",
}) {
  const [currentState, setCurrentState] = useState(checked);

  useEffect(() => {
    setCurrentState(checked);
  }, [checked]);

  const handleToggle = () => {
    if (disabled) return;

    const newValue = (currentState + 1) % 4;
    setCurrentState(newValue);

    if (onChange) {
      onChange(newValue);
    }
  };

  const sizes = {
    sm: "h-5 w-16",
    md: "h-6 w-20",
    lg: "h-7 w-24",
  };

  const knobSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  const stateStyles = {
    0: {
      bg: "bg-gray-300",
      icon: <X size={12} className="text-primary" />,
      translate: "translate-x-0",
    },
    1: {
      bg: "bg-brand-soft",
      icon: <Check size={12} className="text-brand" />,
      translate: "translate-x-[100%]",
    },
    2: {
      bg: "bg-yellow-200",
      icon: <Clock3 size={12} className="text-yellow-700" />,
      translate: "translate-x-[200%]",
    },
    3: {
      bg: "bg-red-200",
      icon: <AlertCircle size={12} className="text-red-600" />,
      translate: "translate-x-[300%]",
    },
  };

  const current = stateStyles[currentState];

  return (
    <button
      onClick={handleToggle}
      disabled={disabled}
      className={`
        relative inline-flex items-center rounded-full transition-colors
        ${sizes[size]}
        ${current.bg}
        ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"}
      `}
    >
      <span
        className={`
          absolute left-0.5 flex items-center justify-center
          rounded-full bg-white shadow transition-transform
          ${knobSizes[size]}
          ${current.translate}
        `}
      >
        {current.icon}
      </span>
    </button>
  );
}