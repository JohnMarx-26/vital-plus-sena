import { useEffect, useState } from "react";
import SelectMenu from "@/shared/components/MenuSelectUser";
import { getMenuOptions } from "@/services/selectOptionService.js";


export default function Sidebar(){

    const[menuOptions, setMenuOptions] = useState([]);

    useEffect(()=> {
        getMenuOptions().then(setMenuOptions).catch(console.error);
    }, []);


        return(
            <div className="sidebar">          
                <div className="w-[208px] space-y-4 ">
                    {menuOptions && menuOptions.map((menu, index) => (
                    <SelectMenu
                    key={index}
                    titulo={menu.titulo}
                    opciones={menu.opciones}
                    />
                    ))}
                    
                </div>
            </div>
        )
}; 

