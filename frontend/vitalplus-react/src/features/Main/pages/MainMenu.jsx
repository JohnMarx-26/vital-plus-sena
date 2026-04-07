import Sidebar from "../components/Sidebar";
import fondo from "@/assets/images/wallpapers/fondo-main.jpg";
import {Header} from "@/shared";

export default function MainMenu() {
  return (
    <div className="h-screen w-screen">

      <div>
        <Header variant="Main"/>
      </div>

      <div className="flex">
      {/*//====================== Sidebar =================*/}
      <div className="flex bg-background-sidebar justify-center p-4 shadow-lg min-h-screen ">
        <Sidebar />
      </div>
      {/*//====================== Fondo de Pantalla =================*/}
      <div>
        <img src={fondo} alt="Vital Plus" className="min-h-screen" />
      </div>
      </div>
    </div>
  );
}
