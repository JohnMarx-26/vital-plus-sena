import Input from "./../../../shared/components/Input";
import Button from "./../../../shared/components/Button";
import Select from "../../../shared/components/Select";
import { useEffect,useState } from "react";
import { getDocumentTypes } from "../services/selectService";


export default function UserForm() {

    const [documentTypes,setDocumentTypes] = useState([])

    useEffect(() => {
      getDocumentTypes().then(setDocumentTypes);
    }, [])



  const handleNameChange = (e) => {
    console.log("Nombre del usuario: " , e.target.value);
  };

  const handleEmailBluer = (e) => {
    console.log("Email del usuario: " , e.target.value);
  };

//Una validacion basica
// export default function UserForm() {
//   const handleNameChange = (e) => {
//     console.log("Nombre del usuario: " , e.target.value);

//     if (value === "") {
//         console.log ${`Este campo esta vacio`}
//     }
//     }
//   };


  return (
    <div>
      <form>
        <Input
          label="Nombre"
          placeholder="Ingrese su nombre"
          onChange={handleNameChange}
        />
        <Select
          label="Tipos de documento"
          name="documentType"
          options={documentTypes}
        />

        <Input
          label="Email"
          placeholder="Ingrese su Email"
          onBlur={handleEmailBluer}
        />

        <div className="flex items-center justify-center gap-12 mt-6">
          <Button
            variant="secondary"
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              console.log("Oprimio cancelar");
            }}
          >
            Cancelar
          </Button>

          <Button
            variant="primary"
            size="md"
            onClick={(e) => {
              e.preventDefault();
              console.log("Oprimio guardar");
            }}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
}