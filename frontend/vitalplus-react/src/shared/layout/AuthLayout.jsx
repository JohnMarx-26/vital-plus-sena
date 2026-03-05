import { Outlet } from "react-router-dom";
import authBg from "@/assets/images/prueba.jpg";
import UserForm from "@/features/users/components/UserForm";

export default function AuthLayout() {

  return(
  <div
    className="relative min-h-screen w-full flex items-center justify-center text-black"
    style={{
      backgroundImage: `url(${authBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    {/* <div className="absolute inset-0 -z-10  bg-white/60" /> */}

    {/* Contenido externo que se inyecta  */}
    <main className="mx-auto">
      <Outlet />
      <UserForm/>
    </main>
  </div>
  )
}
