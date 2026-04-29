import { ShoppingCart, Truck, CreditCard, Check } from "lucide-react";

const STEPS = [
  { label: "Carrito de compras", icon: ShoppingCart },
  { label: "Despacho / Retiro", icon: Truck },
  { label: "Pago y Confirmación", icon: CreditCard },
];

export default function CheckoutStepper({ currentStep }) {
  return (
    <div className="flex items-center w-full mb-8">
      {STEPS.map((step, i) => {
        const isDone = i < currentStep;
        const isActive = i === currentStep;
        const Icon = step.icon;

        return (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all
                  ${isDone || isActive
                    ? "bg-brand border-brand text-text-inverse"
                    : "bg-background border-text-muted text-text-secundary"
                  }`}
              >
                {isDone
                  ? <Check className="w-4 h-4" />
                  : <Icon className="w-4 h-4" />
                }
              </div>
              <span
                className={`text-xs text-center max-w-20 leading-tight
                  ${isActive ? "font-bold text-brand" : "text-text-muted"}`}
              >
                {step.label}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 mb-5 transition-all
                  ${isDone ? "bg-brand" : "bg-text-secundary"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}