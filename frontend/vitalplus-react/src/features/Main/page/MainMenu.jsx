import Sidebar from "@/features/Main/components/Sidebar.jsx"
import logo from "@/assets/images/logo-sfondo.png"
import fondo from "@/assets/images/wallpaper-main.jpg" 

export default function Menu(){

    return (
    <div className="flex h-screen w-screen">
      {/* Sidebar */}
    <div className="w-60 bg-blue-300 flex flex-col p-4 justify-center">
        {/* logo */}
        <div className="w-60 h-20  mx-auto "> 
            <img src={logo} alt="Vital Plus" className= "w-full h-full object-contain"/>
        </div>
        <div className=" h-10"></div>
        <Sidebar />
    </div>

     {/* fondo de pantalla */}
    <div className="flex-1 bg-cover ">
        <img src={fondo} alt="Vital Plus" className= "w-full h-full object-contain"/>
    </div>
    </div>
    );
}



