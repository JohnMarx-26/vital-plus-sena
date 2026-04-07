import { useState } from "react";
import Button from "@/shared/components/Button";
import { SquarePen } from "lucide-react"
import usuario from "@/assets/svg/icono-usu-dark.svg"
import { Delete} from "lucide-react"

export default function SupplierDetailForm () {

    // se crea un objeto para almacenar  todas las propiedades que posteriomente sera la informacion 
    // que se muestre en el formulario
    const userData = {
        fullName: "BAYER",
        documentType: "NIT",
        documentNumber: 1090074404,
        userType: "Proovedor",
        email: "Bayer26@gmail.com",
        phone: 3152405454,
        address: "Antioquia Medellín",
        createdAt: "2025/12/15",
        // password: "*************",
    };

    //  se usa un estado para que dependiendo el click muestre un estado u otro en el boton
    const [userStatus, setUserStatus] = useState("Activo");
    const toggleStatus = () => {
    setUserStatus((prev) => (prev === "Activo" ? "Inactivo" : "Activo"));
    };
    
    // array de objetos para renderizar dinamicamente con map lo que seria (label y value)
    const userDetails = [
        { label: "Tipo de documento", value: userData.documentType },
        { label: "Número de documento", value: userData.documentNumber },
        { label: "Tipo de usuario", value: userData.userType },
        { label: "Correo electrónico", value: userData.email },
        { label: "Número celular", value: userData.phone },
        { label: "Dirección", value: userData.address },
        { label: "Fecha creación cuenta", value: userData.createdAt },
        // { label: "Contraseña", value: userData.password },
    ];



    return (
            // SECCION PADRE 
        <section className="w-full px-6  pl-16 py-8 mt-5">
            <div className="mx-auto flex w-full max-w-7xl gap-12 justify-center">
                <aside className="w-full lg:max-w-sm">
                    {/* contenedor 1 - Imagen y botones */}
                <div className="rounded-2xl border border-background-muted bg-background p-6 shadow-sm">
                    <div className="mb-6 flex justify-center">
                    <h1 className="border-b-2 border-text-secundary pb-1 text-font-md font-medium text-slate-900">
                        Opciones de Proveedores
                    </h1>
                    </div>

                    {/* Imagen Proovedor */}
                    <div className="flex flex-col items-center">
                    <div className="flex h-32 w-32 items-center justify-center">
                        <img src={usuario} alt="Logo Inicio Sesion" className="h-32 border-border z-10"/>
                    </div>

                    {/* Nombre del Provedor */}
                    <div className="mt-2 w-full max-w-xs border-b border-background-muted pb-1 text-center">
                        <p className="text-sm font-medium text-text-secundary">
                        {userData.fullName}
                        </p>
                    </div>

                    <div className="mt-5 flex w-full flex-col items-center gap-4">
                        <div className="flex flex-wrap items-center justify-center gap-3">

                            {/* Boton Estado */}
                        <Button
                            type="button"
                            size="md"
                            className={`px-6 py-2 rounded-md shadow-md text-dropdowns ${
                            userStatus === "Activo"
                                ? "bg-gray-500 hover:bg-gray-700"
                                : "bg-brand hover:bg-brand-hover"
                            }`} 
                            onClick={toggleStatus}
                        >
                            {userStatus === "Activo"
                            ? "Usuario Inactivo"
                            : "Usuario Activo"}
                        </Button>

                        {/* Boton modificar */}
                    <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        className="flex items-center gap-2"
                        // onClick={() => console.log("Oprimió cancelar")}
                    >
                        <SquarePen className="w-5 h-5"/>
                        Modificar
                    </Button>
                        </div>

                        {/* Boton de eliminar */}
                        <div>
                            <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        onClick={() => alert("Proovedor Eliminado con Exito")}
                        className="flex items-center gap-2"
                    >
                        <Delete className="w-6 h-6 mx-1"/>
                        Eliminar Proveedor
                    </Button>
                        </div>
                    </div>
                    </div>
                </div>
            </aside>    7

            {/* contenedor 2 - informacion */}
            <div className="w-[600px] items-center mt-5">
                <div className="rounded-2xl border border-background-muted bg-backgroud p-5 shadow-sm">
                    <div className="flex flex-col gap-5">

                        {/* con map se itera sobre userDetails para renderizar los label y sus valores */}
                    {userDetails.map((item) => (
                        <div
                        key={item.label}

                        // Se crean dos columnas la primera 220px  
                        // la segunda 1fr que se adapta al espacio disponible despues de los 220px
                        className="grid grid-cols-[220px_1fr] items-start gap-x-8"
                        >
                        <span className="text-sm font-medium text-primary">
                            {item.label}:
                        </span>

                        <span className="text-sm text-primary ">
                            {item.value}
                        </span>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </section>
    );
}