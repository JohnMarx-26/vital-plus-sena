import Input from "@/shared/components/Input";

export default function ProveedorForm(){
    return (
        // CONTENEDOR PADRE
        <div className=" flex w-1200px h-800px justify-center items-center mt-20">
            {/* // FORMULARIO */}
            <form className="grid grid-cols-3 gap-4 ">
                <div>
                
                    <Input
                            label="Nombre proveedor"
                            type="text"
                            placeholder="Ingrese el nombre del proveedor"
                        />
                    <Input
                            label="Nombre contacto (representante)"
                            type="text"
                            placeholder="Ingrese el nombre del contacto"
                        />
                    <Input
                            label="ciudad"
                            type="text"
                            placeholder="Ingrese la ciudad del proveedor"
                        />
                </div>

                {/* columna 2  */}
                <div>
                
                    <Input
                            label="NIT"
                            type="text"
                            placeholder="Ingrese el NIT "
                        />
                    <Input
                            label="Telefono contacto"
                            type="tel"
                            placeholder="Ingrese el numero del proveedor"
                        />
                    <Input
                            label="Direccion"
                            type="text"
                            placeholder="Ingrese la direccion del proveedor"
                        />
                </div>

                {/* columna 3 */}
                <div>
                
                    <Input
                            label="Razon social"
                            type="text"
                            placeholder="Ingrese la razon social"
                        />
                    <Input
                            label="Correo electronico contacto"
                            type="mail"
                            placeholder="Ingrese el correo electronico"
                        />   
                </div>
            </form>
        </div>
    );
}

