import Input from "./../../../shared/components/Input";

export default function UserForm(){

        return(

            <div>
                {/* Formulario para crear el usuario */}
                <form >

                    <Input
                     label="Nombre"
                    placeholder="Ingrese su nombre"
                    
                    >
                    </Input>

                </form>
            </div>

        )
}