import {
    DropdownMain,
    DropdownTriggerMain,
    DropdownContentMain,
    DropdownItemMain,
} from "@/shared/";

import { Button } from "@/shared";
import { Link } from "react-router-dom";
import  usuarios from "@/assets/svg/icono-usuario-menu.svg";
import  ventas from "@/assets/svg/icono-ventas-menu.svg";
import  proveedores from "@/assets/svg/icono-proveedor-menu.svg";
import  productos from "@/assets/svg/icono-medicamentos-menu.svg";
import logo from "@/assets/svg/logo-Header.svg";
import { ChevronUp, ChevronDown } from "lucide-react"
import { useState } from "react";

export default function Sidebar(){

    const [isName, setIsName] = useState(null);
    return(

        <div className="h-130 flex flex-col justify-center ">

        <img
            src={logo}
            alt="Vital Plus"
            className="w-full h-10"
        />

            <div  className="flex flex-col py-3 gap-5 ">

            {/* //====================== USUARIOS ======================= */}
            <DropdownMain>
                <DropdownTriggerMain> 
                    <Button
                    variant="primary"
                    size="xl"
                    onClick={() => setIsName(isName === "Usuarios" ? null : "Usuarios")}
                    >
                        <img src={usuarios} className="w-5 h-5"/>
                        Usuarios
                        {isName === "Usuarios"
                        ? <ChevronUp className="h-5 w-5 ml-auto"/>
                        : <ChevronDown className="h-5 w-5 ml-auto" />
                        }
                    </Button>
                </DropdownTriggerMain>
                <DropdownContentMain className="right-0 w-48 align-middle z-10">
                    <DropdownItemMain>
                    <Link to="/admin/usuarios/crear" className="block w-full">
                        Crear Usuario
                    </Link>
                    </DropdownItemMain>
                    <DropdownItemMain>
                    <Link to="/usuarios/listar" className="block w-full">
                        Listar Usuarios
                    </Link>
                    </DropdownItemMain>
                    <DropdownItemMain>
                    <Link to="" className="block w-full">
                        Configuración
                    </Link>
                    </DropdownItemMain>
                </DropdownContentMain>
            </DropdownMain>

            {/* //====================== VENTAS ======================= */}
            <DropdownMain>
                <DropdownTriggerMain> 
                    <Button
                    variant="primary"
                    size="xl"
                    onClick={() => setIsName(isName === "Ventas" ? null : "Ventas")}
                    >
                        <img src={ventas} className=" w-6 h-6"/>
                        Ventas
                        {isName === "Ventas"
                        ? <ChevronUp className=" h-5 w-5 ml-auto" /> 
                        : <ChevronDown className=" h-5 w-5 ml-auto" /> 
                        }
                    </Button>
                </DropdownTriggerMain>
                <DropdownContentMain className="right-0 w-48 align-middle z-10">
                    <DropdownItemMain>
                    <Link to="/ventas/crear" className="block w-full">
                        Crear Ventas
                    </Link>
                    </DropdownItemMain>
                    <DropdownItemMain>
                    <Link to="/ventas/listar"className="block w-full">
                        Listar Ventas
                    </Link>
                    </DropdownItemMain>
                </DropdownContentMain>
            </DropdownMain>

             {/* //====================== PRODUCTOS ======================= */}
            <DropdownMain>
                <DropdownTriggerMain> 
                    <Button
                    variant="primary"
                    size="xl"
                    onClick={() => setIsName(isName === "Productos" ? null : "Productos")}
                    >
                        <img src={productos} className=" w-6 h-6"/>
                        Productos
                        {isName === "Productos"
                        ? <ChevronUp className=" h-5 w-5 ml-auto" /> 
                        : <ChevronDown className=" h-5 w-5 ml-auto" /> 
                        }
                    </Button>
                </DropdownTriggerMain>
                <DropdownContentMain className="right-0 w-48 align-middle z-10">
                    <DropdownItemMain>
                    <Link to="/productos/crear" className="block w-full">
                        Crear Productos
                    </Link>
                    </DropdownItemMain>
                    <DropdownItemMain>
                    <Link to="/productos/listar" className="block w-full">
                        Listar Productos
                    </Link>
                    </DropdownItemMain>
                </DropdownContentMain>
            </DropdownMain>

             {/* //====================== PROVEEDORES ======================= */}
            <DropdownMain>
                <DropdownTriggerMain> 
                    <Button
                    variant="primary"
                    size="xl"
                    onClick={() => setIsName(isName === "Proveedores" ? null : "Proveedores")}
                    >
                        <img src={proveedores} className=" w-6 h-6"/>
                        Proveedores
                        {isName === "Proveedores"
                        ? <ChevronUp className=" h-5 w-5 ml-auto" /> 
                        : <ChevronDown className=" h-5 w-5 ml-auto" /> 
                        }
                    </Button>
                </DropdownTriggerMain>
                <DropdownContentMain className="right-0 w-48 align-middle z-10">
                    <DropdownItemMain>
                    <Link to="/proveedores/crear" className="block w-full">
                        Crear Proveedores
                    </Link>
                    </DropdownItemMain>
                    <DropdownItemMain>
                    <Link to="/proveedores/listar" className="block w-full">
                        Listar Proveedores
                    </Link>
                    </DropdownItemMain>
                </DropdownContentMain>
            </DropdownMain>
        </div>
    </div>                   
        )
}; 

