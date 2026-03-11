// UseEffect
// Es un hook que permite ejecutar efectos secundarios en componentes funcionales.
// Un efecto secundario es cualquier operacion que:
// 1- Ocurre fuera del render
// 2- Interactua con el mundo exterior al componente
// Ejemplos:
// - Llamadas a APIs
// - Manipulacion del DOM
// - Actualizar un titulo del navegador

// ====== SINTAXIS =======
// useEfecct(() => {
//      efecto *                                                 - Codigo que se ejecuta
// },[]) ;                                                       - En los corchetes se colocan los arreglos de dependencias

// import { useEffect, useState } from "react";

// =========== Efecto con array vacio ===========

// function DeleteUseEfecct() {
//   const [message, setMessage] = useState("Cargando...");

//   useEffect(() => {
//     setTimeout(() => {
//       setMessage("Se acaba de ejecutar el efecto");
//     }, 3000);
//   }, []);

//   return <h1>{message}</h1>;
// }

// export default DeleteUseEfecct;

// =====================================================

// Hook useEffect con una dependencia

// Entender que useEffect se vuelve a ejecutar cuando cambia una dependencia
// - useEffect puede ejecutarse otra vez si algo cambia
// - Ese algo se declara en el array de dependencias

import { useEffect, useState } from "react";

function DeleteUseEfecct() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState("El contador No ha cambiado");

  useEffect(() => {
    setMessage(`El contador cambio a ${count}`)
  },[count]);

  return (
    <>
      <h2>{count}</h2>
      <p>{message}</p>

      <button className="border border-border p-2" onClick={() => setCount(count+1)}>Botón de incremento</button>
    </>
  );
}

export default DeleteUseEfecct;

// ============================
// ======== IMPORTANTE ========
// - Si una dependencia cambia el efecto se ejecuta
// - Si no cambia, el efecto no se ejecuta
// -------------

