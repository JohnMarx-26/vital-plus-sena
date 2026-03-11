import { LoginForm } from "@/features/auth";

export default function AdminLoginPage() {
  const outerBorder = "border-[color:var(--color-primary-700)]";
  const innerBorder = "border-[color:var(--color-primary-100)]";

  return (
    <div
      className="
        min-h-screen
        bg-[color:var(--semantic-backgrond)]
        flex
        flex-col
        items-center
        justify-start
        pt-20
        px-6
      "
    >
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-[var(--color-primary-600)] tracking-wider opacity-90">
          Vital-Plus Admin
        </h1>
      </div>

      <div className={`w-full max-w-md rounded-xl border-2 ${outerBorder} p-2`}>
        <div className={`rounded-lg border-2 ${innerBorder} p-8 bg-white`}>
          <LoginForm
            title="Iniciar sesión administrador"
            description="Ingresa tus credenciales de administrador"
            isAdmin={true}
            userName="Admin"
          />
        </div>
      </div>
    </div>
  );
}