// Hook useState
// import {useState} from "react";

// export default function DeleteCounter(){

//     // count es el valor actual del estado
//     // setCount es la función para actualizar
//     // useState() es el valor inicial
//     const [count, setCount] = useState(0)

//     return(
//         <>
//             <p>Counter:{count}</p>
//             <button onClick={()=> setCount(count+1)}>Incrementar</button>
//         </>
//     );

// }

// =============================================================
// =============================CONTADOR========================
// =============================================================

export default function DeleteCounter() {
  let count = 0;

  const incrementar = () => {
    // count = count + 1;
    console.log("El nuevo valor es: ", count);
  };

  return (
    <>
      <p>Contador: {count}</p>
      <button onClick={incrementar}> Incrementar </button>
    </>
  );
}

// 1- React solo actualiza la interfaz cuando cambia el estado useState
// 2- La UserInterface en este ultimo ejemplo deja de actualizarse porque no estamos llamando a setCount, que es el mecanismo que le indica a react que debe re-rendirizar.
// 3- Cada vez que llamamos a setCount le estamos diciendo a React: el estado debe actualizarse y el componente debe volver a renderizarse.

