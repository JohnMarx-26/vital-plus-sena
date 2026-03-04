import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">

      {/* Logo */}
      <div className="mb-8">
        <h1
          className="
            text-4xl
            font-extrabold
            text-[var(--color-primary-600)]
            tracking-wider
            opacity-90
          "
        >
          Vital-Plus
        </h1>
      </div>

      {/* Card */}
      <div
        className="
          bg-white
          w-full
          max-w-md
          p-8
          rounded-xl
          border
          border-gray-200
          shadow-[0_4px_12px_rgba(0,0,0,0.05)]
        "
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Iniciar Sesión
        </h2>

        <LoginForm />
      </div>

    </div>
  );
}