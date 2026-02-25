// import { useState } from "react";

// export default function DeleteCounter() {
//       //Count valor actual de estado
//     //setCount funcion para actualizar
//   //useState()es el valor inicial
//   const [count, setCount] = useState(0);
  

//   return (
//     <>
//       <p>Counter: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Incrementar</button>
//     </>
//   );
// }


// /////////////////////////////////////////////////////////


export default function DeleteCounter(){

    let count = 0

    const incrementar = () => {
        count = count + 1;
        console.log("el nuevo valor es:", count)
    }
    return(
        <>
            <p>Contador: {count}</p>
            <button onClick={incrementar}>Incrementar</button>
        </>
    );
};

// 1- React solo actualiza la interfaz cuando cambia el estado useState
// 2- La UI en este ultimo ejercicio deja de actualizarse por que no estamos llamando al setcount,que es el mecanismo que indica a react que debe re-renderizar.
// 3- Cada vez que llamamos a setcount, le estamos diciendo a React el esta debe actualizarse y el componente debe volver a renderizarse.