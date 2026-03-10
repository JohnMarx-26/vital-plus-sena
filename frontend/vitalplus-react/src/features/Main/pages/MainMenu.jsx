import Sidebar from "@/features/Main/components/Sidebar.jsx";
import logo from "@/assets/svg/logo-Header.svg";
import fondo from "@/assets/images/fondo-main.jpg";
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

            <div className=" w-full h-15 bg-brand"> 
                
                <div className="relative hidden sm:block items-center align-middle">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-text-primary" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="
                        w-[400px]
                        h-10
                        pl-9 pr-4 py-2
                        rounded-full
                        border border-background
                        bg-background
                        text-
                        placeholder:text-
                        focus:outline-none
                        focus:ring-2 focus:ring-white/60
                        ">
                    </input>
                </div>
            </div>
            <img src={fondo} alt="Vital Plus" className="flex-2"/>
        </div>
    </div>
    );
}





