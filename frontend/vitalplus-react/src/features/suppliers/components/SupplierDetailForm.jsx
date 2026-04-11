import { useEffect, useState } from "react";
import Button from "@/shared/components/Button";
import { SquarePen } from "lucide-react";
import usuario from "@/assets/svg/icono-usu-dark.svg";
import { useNavigate } from "react-router-dom";
// import { Delete } from "lucide-react";

export default function SupplierDetailForm({ supplier }) {

    // se usa un estado para que dependiendo el estado del proveedor
    // se muestre Activo o Inactivo en el boton
    const [userStatus, setUserStatus] = useState("Inactivo");
    const navigate = useNavigate();


    // sincroniza el estado local del botón con el estado real que llega del backend
    useEffect(() => {
        if (supplier?.status === "activo") {
            setUserStatus("Activo");
        } else {
            setUserStatus("Inactivo");
        }
    }, [supplier]);

    // cambia el texto del botón de estado
    // por ahora es visual, todavía no actualiza la base de datos
    const toggleStatus = () => {
        setUserStatus((prev) => (prev === "Activo" ? "Inactivo" : "Activo"));
    };

    // si aún no hay proveedor cargado no renderiza nada
    if (!supplier) return null;
    
    // array de objetos para renderizar dinamicamente con map lo que seria (label y value)
    const userDetails = [
        { label: "ID", value: supplier.id },
        { label: "Tipo de documento", value: supplier.documentType },
        { label: "Número de documento", value: supplier.documentNumber || "Sin NIT" },
        { label: "Nombre proveedor", value: supplier.fullName },
        { label: "Razón social", value: supplier.razon_social },
        { label: "Tipo de usuario", value: supplier.userType },
        { label: "Nombre contacto", value: supplier.contactName },
        { label: "Correo electrónico", value: supplier.email },
        { label: "Número celular", value: supplier.phone },
        { label: "Dirección", value: supplier.address },
        { label: "Ciudad", value: supplier.city },
        { label: "Fecha creación cuenta", value: supplier.createdAt },
    ];

    return (
            // SECCION PADRE 
           <section className="flex w-full px-6 py-8 justify-center">
             <div className="mx-auto flex w-full flex-col gap-8 lg:flex-row lg:items-start justify-center">
       
               <aside className="w-full lg:max-w-sm">
                 <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
       
                   <div className="mb-6 flex justify-center">
                     <h1 className="border-b-2 border-slate-900 pb-1 text-font-md font-medium text-slate-900">
                       Opciones de proveedor
                     </h1>
                   </div>
       
                   <div className="flex flex-col items-center">
       
                     <div className="flex h-52 w-52 items-center justify-center">
                       <img
                         src={usuario}
                         alt="Icono medicamento"
                         className="h-50 w-50"
                       />
                     </div>
       
                     {/* Nombre del proveedor */}
       
                     <div className="mt-6 w-full max-w-xs border-b border-slate-400 pb-3 text-center">
                       <p className="text-sm font-medium text-slate-800">
                         {supplier.fullName}
                       </p>
                     </div>
       
                     <div className="mt-5 flex w-full flex-col items-center gap-4">
       
                       <div className="flex flex-wrap items-center justify-center gap-3">
       
       
                       {/* Boton estado */}
                        <Button
                            type="button"
                            size="md"
                            className={`px-6 py-2 rounded-md shadow-md text-dropdowns ${
                            userStatus === "Activo"
                                ? "bg-brand hover:bg-brand-hover"
                                : "bg-gray-500 hover:bg-gray-700"
                            }`} 
                            onClick={toggleStatus}
                        >
                            {userStatus === "Activo"
                            ? "Proveedor Activo"
                            : "Proveedor Inactivo"}
                        </Button>
       
                         {/* Boton modificar */}
                         <Button
                           variant="secondary"
                           size="sm"
                           type="button"
                           className="flex items-center gap-2"
                           onClick={() => navigate(`/proveedores/modificar/${supplier.id}`)}
                         >
                           <SquarePen className="w-5 h-5" />
                           Modificar
                         </Button>
       
                       </div>
       
                     </div>
       
                   </div>
       
                 </div>
               </aside>
       
                       {/*             {/* contenedor 2 - informacion */} 
               <div className="w-full max-w-[700px]">
                 <div className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
       
                   <div className="flex flex-col gap-6">
       
                               {/* con map se itera sobre userDetails para renderizar los label y sus valores */}
                     {userDetails.map((item) => (
                       <div
       
                         // Se crean dos columnas la primera 220px  
                         // la segunda 1fr que se adapta al espacio disponible despues de los 220px
       
       
                         key={item.label}
                         className="grid grid-cols-[220px_1fr] items-start gap-x-8"
                       >
                         <span className="text-sm font-medium text-slate-700">
                           {item.label}:
                         </span>
       
                         <span className="text-sm text-slate-900 break-words">
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