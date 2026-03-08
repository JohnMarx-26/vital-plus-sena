// CrearProveedor
import Header from "@/shared/components/Header";
import ProveedorForm from "@/features/suppliers/components/SupplierForm";
import Button from "@/shared/components/Button" 


export default function CreateSupplierPage() {
    return (
        <div className="min-h-screen flex flex-col">
        {/* Header menu */}
        <Header />

        {/* espaciado */}
        <div className="h-5"></div>

        {/* Espacio para los botones  */}
        <div className="flex w-full justify-between">
            <div className="justify-left">
            <Button
            variant="secondary"
            size="sm"
            type="button"
            // onClick={() => console.log("Oprimió cancelar")}
            >
            Retroceder
            </Button>
            </div>

            <div className="justify-right">
            <Button
            variant="secondary"
            size="sm"
            type="button"
            // onClick={() => console.log("Oprimió cancelar")}
            >
            Modificar
            </Button>
            <Button
            variant="secondary"
            size="sm"
            type="button"
            // onClick={() => console.log("Oprimió cancelar")}
            >
            Modificar
            </Button>
            </div>
        </div>

        {/* Formulario Proveedores */}
            <main className="flex-1 flex justify-center items-center p-8">
                <ProveedorForm />
            </main>
        </div>
    );
}