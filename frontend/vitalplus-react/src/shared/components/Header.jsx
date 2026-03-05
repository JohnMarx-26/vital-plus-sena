import logo from "@/assets/logo-sfondo.png";
import { User, Bell } from "lucide-react";

export default function Header(){

    return(

        <header>
            {/* parte superior del header azul osuro */}
            <div className="w-full h-15 bg-brand-hover flex justify-between items-center px-4 text-text-secundary">
            {/* ubicacion para el logo */}
            <img src={logo} alt="Logo VitalPlus" className="h-8 border-border" />

            <div className="flex gap-4">
                <User size={20} />
                <Bell size={20} />
            </div>
        </div>
         {/* parte inferior del header azul claro */}
            <div className="w-full h-5 bg-brand-light "></div>
        </header>
    );
}