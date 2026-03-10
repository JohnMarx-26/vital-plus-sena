import Sidebar from "@/features/Main/components/Sidebar.jsx";
import logo from "@/assets/svg/logo-Header.svg";
import fondo from "@/assets/images/fondo-main.jpg";
import campana from "@/assets/svg/campana.svg";
import usuario from "@/assets/svg/icono-usuario.svg"
import { Search } from "lucide-react"; 


export default function Menu(){

    return (
    <div className="flex h-screen w-screen">
        {/* Sidebar */}
        <div className="w-60 bg-background-sidebar flex flex-col p-4 justify-center shadow-lg">
            {/* logo */}
            <div className="w-13 h-13  mx-auto "> 
                <img src={logo} alt="Vital Plus" className= "w-full h-full object-contain"/>
            </div>
            <div className=" h-10"></div>
            <Sidebar />
        </div>
        {/* fondo de pantalla */}
        <div className="flex-1 bg-cover ">

            <div className="flex w-full h-14 bg-brand justify-center"> 
                
                <div className=" relative hidden sm:block mt-2 w-[800px]">
                    <Search className="absolute left-[210px] top-2/5 -translate-y-1/2 size-4 text-text-primary" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="
                        w-[400px]
                        h-9
                        pl-9 pr-4 py-2
                        rounded-full
                        border border-background
                        hover: bg-shadow-2xl 
                        bg-background
                        text-text-primary
                        placeholder:text-primary
                        focus:outline-none
                        focus:ring-2 focus:ring-brand-light
                        mx-auto
                        block
                        ">
                    </input>
                </div>
                {/* iconos de usurio y notificaciones */}
                <div className="flex px-10 gap-4 items-center">
                    <img src={usuario} alt="Logo Inicio Sesion" className="h-8 border-border"/>
                    <p>Admin</p> 
                    <img src={campana} alt="Logo notificaciones" className="h-6 border-border"/>
                </div>
            </div>
            <img src={fondo} alt="Vital Plus" className="flex-2"/>
        </div>
    </div>
    );
}





