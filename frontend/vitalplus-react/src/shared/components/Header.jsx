import logo from "@/assets/svg/logo-Header.svg";
import campana from "@/assets/svg/campana.svg";
import usuario from "@/assets/svg/icono-usuario.svg"

export default function Header(){

    return(

        <header>
            {/* parte superior del header color de la marca  */}
            <div className="w-full h-16 bg-brand flex justify-between items-center px-4 text-text-secundary">
                {/* ubicacion para el logo */}
                <img src={logo} alt="Logo VitalPlus" className="h-10 border-border"/>

                <div className="flex px-10 gap-44 ">
                    <img src={usuario} alt="Logo Inicio Sesion" className="h-8 border-border"/>
                    <img src={campana} alt="Logo notificaciones" className="h-6 border-border"/>
                </div>
        </div>
         {/* parte inferior del header azul claro */}
            <div className="w-full h-5 bg-brand-light border-brand-light "></div>
        </header>
    );
}