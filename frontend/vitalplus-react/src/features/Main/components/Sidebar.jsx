import { useEffect, useState } from "react";
import SelectMenu from "@/shared/components/MenuSelectUser";
import { getMenuOptions } from "@/services/selectOptionService.js";

export default function Sidebar(){

    const[menuOptions, setMenuOptions] = useState();
    useEffect(()=> {
        getMenuOptions().then((data)=> setMenuOptions(data));
    }, []);
        return(
            <div className="sidebar">

                
                <div className="w-[240px] space-y-4">
                    {menuOptions && menuOptions.map((menu, titulo) => (
                    <SelectMenu
                    key={titulo}
                    titulo={menu.titulo}
                    opciones={menu.opciones}
                    />
                    ))}
                </div>
            </div>
        )
}; 