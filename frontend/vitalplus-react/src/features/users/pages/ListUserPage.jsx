import UserDataTable from "../components/UserDataTable";
import {  UserColumns }   from "../table/UserColumns";

import { users } from "@/data/user/users";
import Header from "@/shared/components/Header";
import retroceder from "@/assets/svg/icono-retroceder.svg";
import Button from "@/shared/components/Button" ;
import {useNavigate} from "react-router-dom";



    /*se crea una arrow function para el boton del formulario
    a esta funcion se le realiza un callback cuando se ejecuta
    el FormLayout, dentro de esta funcion esta la logica de los botones
    y sus estilos*/

const Botones = () => {
    
    const navigate = useNavigate()

    return ( 
        <div className="flex w-full justify-between px-10 my-8">

            <div>
                {/* Boton Retroceder */}
                <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    //para devolverme al apartado del menu del administrador
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2"
                >
                    <img src={retroceder} alt="icono-retroceder" className="w-5 h-5"/>
                    Retroceder
                </Button>
            </div>
        </div>    
    );
}


export default function ListUserPage() {

  return (
    <div className="w-full h-dvh">
      <Header/>
      <Botones />
    <div className="p-6">
      
      <UserDataTable
        data={users}
        columns={UserColumns}
      />

    </div>
    </div>
  )
}




