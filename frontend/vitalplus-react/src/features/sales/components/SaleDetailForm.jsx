import Button from "@/shared/components/Button";
import { FileDown} from "lucide-react"
import usuario from "@/assets/svg/icono-ventas.svg"



export default function SaleDetailForm () {

    // se crea un objeto para almacenar  todas las propiedades que posteriomente sera la informacion 
    // que se muestre en el formulario
    const userData = {
        facturaDeVenta: 415003,
        fechaEmision: "11/03/2026",
        documentNumber: "1090074404",
        userType: "cliente",
        email: "Bayer26@gmail.com",
        phone: "3152405454",
        userSeller: "Farmaceuta002",
        subTotal: 35500.00,
        IVA: "19%",
        Descuentos: "10%",
        Total: 38020.05,
        TipoPago: "Tarjeta DEBITO-MAESTRO",
    };


    // array de objetos para renderizar dinamicamente con map lo que seria (label y value)
    const userDetails = [
        { label: "Factura de Venta N° ", value: userData.facturaDeVenta },
        { label: "Fecha de emision ", value: userData.fechaEmision },
        { label: "N° de documento ", value: userData.documentNumber },
        { label: "Tipo de usuario ", value: userData.userType },
        { label: "Correo electrónico", value: userData.email },
        { label: "Número celular", value: userData.phone },
        { label: "Vendedor ", value: userData.userSeller },
        { label: "Subtotal ", value: userData.subTotal },
        { label: "IVA ", value: userData.IVA },
        { label: "Descuento", value: userData.Descuentos },
        { label: "Total", value: userData.Total },
        { label: "Medio de Pago ", value: userData.TipoPago },
    ];

    return (
            // SECCION PADRE 
        <section className="w-full px-6 py-4 items-center justify-center">
                
            <div className="flex w-full justify-center gap-5 pl-10">

                    {/* contenedor 1 - Imagen y botones */}
                <div className="h-100 mt-7 pt-12  rounded-2xl border border-background-muted bg-background p-6 shadow-sm items-center ">
                    <div className="mb-6 flex items-center justify-center">
                    <h1 className="border-b-2 border-text-secundary pb-1 text-font-md font-medium text-slate-900 ">
                        Detalles de Venta
                    </h1>
                    </div>

                    {/* Imagen Proovedor */}
                    <div className="flex flex-col items-center ">
                    <div className="flex h-32 w-32 items-center justify-center">
                        <img src={usuario} alt="Logo Inicio Sesion" className="h-40 border-border z-10"/>
                    </div>

                    {/* Nombre del Provedor */}
                    <div className="mt-6 w-full max-w-xs border-b border-background-muted pb-3 text-center">
                        <p className="text-sm font-medium text-text-secundary">
                        {userData.facturaDeVenta}
                        </p>
                    </div>

                    <div className="mt-5 flex w-full flex-col items-center gap-4">
                        <div className="flex flex-wrap items-center justify-center gap-3">
                        {/* Boton modificar */}
                    <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        className="flex items-center gap-2"
                        // onClick={() => console.log("Oprimió cancelar")}
                    >
                        <FileDown className="w-5 h-5"/>
                        Descargar factura
                    </Button>
                        </div>

                    </div>
                    </div>
                </div>

            {/* contenedor 2 - informacion */}
            <div className="w-[600px] items-center mt-5">
                <div className="rounded-2xl border border-background-muted bg-backgroud p-5 shadow-sm">
                    <div className="flex flex-col gap-3">

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