// CrearProveedor
import Header from "@/shared/components/Header";
import ProveedorForm from "@/features/suppliers/components/SupplierForm";

export default function CrearProveedor() {
    return (
        <div className="min-h-screen flex flex-col">
        {/* Header menu */}
        <Header />
        {/* Formulario Proveedores */}
            <main className="flex-1 flex justify-center items-center p-8">
                <ProveedorForm />
            </main>
        </div>
    );
}