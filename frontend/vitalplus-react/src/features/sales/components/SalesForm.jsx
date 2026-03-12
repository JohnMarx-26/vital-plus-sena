import Input from "@/shared/components/Input";

export default function VentasForm(){
    return (
        // CONTENEDOR PADRE
        <div className=" flex w-1200px h-800px justify-center items-center mt-15">
            {/* // FORMULARIO */}
            <form className="grid grid-cols-3 gap-4">
                <div>
                
                    <Input
                            label="Numero de factura"
                            type="text"
                            placeholder="Ingrese el numero de factura"
                        />
                    <Input
                            label="Fecha y hora de venta"
                            type="text"
                            placeholder="Fecha y hora de la venta Automatico"
                        />
                    <Input
                            label="Cliente"
                            type="text"
                            placeholder="Ingrese datos del cliente"
                        />
                        <Input
                            label="Farmaceuta"
                            type="text"
                            placeholder="Farmaceuta que realiza la venta"
                        />
                </div>

                {/* columna 2  */}
                <div>
                
                    <Input
                            label="Subtotal"
                            type="text"
                            placeholder="Ingrese el subtotal de la venta"
                        />
                    <Input
                            label="IVA"
                            type="tel"
                            placeholder="Ingrese el iva de la venta"
                        />
                    <Input
                            label="Descuento"
                            type="text"
                            placeholder="Ingrese el descuento de la venta"
                        />
                        <Input
                            label="Total"
                            type="text"
                            placeholder="Ingrese el total de la venta"
                        />
                </div>

                {/* columna 3 */}
                <div>
                
                    <Input
                            label="Tipo de Pago"
                            type="text"
                            placeholder="Ingrese el tipo de pago "
                        />
                    <Input
                            label="Estado"
                            type="mail"
                            placeholder="Ingrese el estado de la venta"
                        />   
                </div>
            </form>
        </div>
    );
}