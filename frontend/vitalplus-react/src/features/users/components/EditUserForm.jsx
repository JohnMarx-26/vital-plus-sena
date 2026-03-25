import Input from "@/shared/components/Input";
import { useEffect, useState } from "react";
import { getDocumentTypes } from "../services/selectService";
import { getUserTypes } from "../services/selectService2";
import Select from "@/shared/components/Select";
import { AvatarUploader } from "@/features/users";

export default function EditUserForm(){

    const [documentTypes, setDocumentTypes] = useState([]);
    const [userTypes, setUserTypes] = useState([]);

    useEffect(() => {
        getDocumentTypes().then(setDocumentTypes);
        getUserTypes().then(setUserTypes);
    }, []);

    return (

        // CONTENEDOR PADRE
        <div className="w-full h-full">

            {/* CARGAR IMAGEN */}
            <div className="flex h-36 justify-center gap-8">
                <AvatarUploader/>
            </div>

            {/* CONTENEDOR FORMULARIO */}
            <div className="flex w-1200px h-800px justify-center items-center mt-20">

                {/* FORMULARIO */}
                <form className="grid grid-cols-3 gap-4">

                    {/* COLUMNA 1 */}
                    <div>

                        <Select
                            label="Tipo de usuario"
                            name="userType"
                            options={userTypes}
                        />

                        <Select
                            label="Tipo de documento"
                            name="documentType"
                            options={documentTypes}
                        />

                        <Input
                            label="Nombres"
                            type="text"
                            placeholder="Ingrese los nombres del usuario"
                        />

                        <Input
                            label="Correo electrónico"
                            type="email"
                            placeholder="Ingrese el correo electrónico"
                        />
                    </div>

                    {/* COLUMNA 2 */}
                    <div>

                        <Input
                            label="Número de documento"
                            type="text"
                            placeholder="Ingrese el número de documento"
                        />

                        <Input
                            label="Apellidos"
                            type="text"
                            placeholder="Ingrese los apellidos del usuario"
                        />

                        <Input
                            label="Teléfono"
                            type="tel"
                            placeholder="Ingrese el número de teléfono"
                        />
                    </div>

                    {/* COLUMNA 3 */}
                    <div>

                        <Input
                            label="Dirección"
                            type="text"
                            placeholder="Ingrese la dirección del usuario"
                        />

                        <Input
                            label="Contraseña"
                            type="password"
                            placeholder="Ingrese la contraseña"
                        />

                        <Input
                            label="Confirmar contraseña"
                            type="password"
                            placeholder="Confirme la contraseña"
                        />
                    </div>

                </form>
            </div>
        </div>
    );
}