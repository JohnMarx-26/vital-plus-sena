import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/prueba.jpg";

export default function AuthLayout() {
  return (
    <div
      className="relative min-h-screen w-full flex items-center justify-center text-black"
      style={{
        backgroundImage: `url(${authBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <main className="mx-auto max-w-7xl px-4 py-6 w-full">
        <Outlet />
      </main>
    </div>
  );
}