import Header from "@/shared/components/Header";
import LogoForm from "@/assets/images/logo-forms.png";

export default function FormLayout({ children }) {
  return (
    // contenedor padre que almacena toda la vista
    <div className="flex min-h-screen bg-background">
      {/* // logo de fondo para los formularios este contenedor esta en el fondo*/}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 flex items-center ">
        <img
          src={LogoForm}
          alt="Logo de fondo"
          className="h-[450px] object-contain justify-left"
        />
      </div>

      {/* // contenido principal este contenedor esta superpuesto al del fondo  */}
      <div className="relative z-10 flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
