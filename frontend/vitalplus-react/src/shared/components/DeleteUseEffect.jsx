/*
useEffect
UseEffect es hook que permite ejecutar efectos secundarios en compónentes funcionales .
Un efecto secundario es cualquier operacion que: 
1-Ocurre fuera del render
2-Interactua con el mundo exterior al componente 

Ejemplos:
-Llamadas a APIs
-Manipulacion del DOM
-Actualizar un titulo del navegador

============SINTAXIS=============================

useEffect(() => {
        efecto *                            - Codigo que se ejecuta 
    }), [];                                 - En los corchetes se colocan el arreglo de dependencias *



*/

// import { useEffect, useState } from "react";

// // ============= Efecto con array vacio =======

// function DeleteUseEffect () {

//     const [message, setMesssage] = useState("Cargando")

//     useEffect(()=> {

//         setTimeout(() => {
//             setMesssage("Se acaba de ejecutar el efecto")
//         }, 3000);
//     },[]);
//     return (
//         <h1>{message}</h1>
//     );

// };

// export  default DeleteUseEffect;


/*
Hook useEffect con una dependencia 

Entender que useEffect se vuelve a ejecutar cuando cambia  una dependencia 

-Use effect puede ejecutarse otra vez ssi algo cambia 
-Ese algo se declara en el array de dependencias
*/ 

import { useEffect,useState } from "react";

function DeleteUseEffect (){
    const [count, setCount] = useState(0);
    const[message, setMesssage] = useState("El contador No ha cambiado");

    useEffect(() => {
        setMesssage(`El contador cambio a ${count}`)
    },[count]);


    return(
        <>
            <h2>{count}</h2>
            <p>{message}</p>

            <button className="border border-border p-2" onClick={() =>setCount(count + 1)}>
                Boton de Incremento
            </button>

        
        </>

    );

};

export default DeleteUseEffect

/*
IMPORTANTE
-Si una dependencia cambia el efecto se ejecuta 
-Si no cambia, el efecto no se ejecuta
-




*/