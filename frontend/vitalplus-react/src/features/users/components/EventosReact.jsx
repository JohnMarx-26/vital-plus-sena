// 1
// export default function E01_OnClick() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>1) onClick</h3>

//       <div
//         onClick={() => console.log(`[${ahora()}] ${nombre} - 1) onClick`)}
//         style={{ padding: 12, border: "1px solid #ccc", width: 260 }}
//       >
//         Haga clic aquí
//       </div>
//     </div>
//   );
// }

// 2
// export default function E02_OnDoubleClick() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>2) onDoubleClick</h3>

//       <p
//         onDoubleClick={() => {
//           console.log(`[${ahora()}] ${nombre} - 2) onDoubleClick`);
//           alert("Doble clic!");
//         }}
//         style={{ padding: 12, border: "1px solid #ccc", width: 260 }}
//       >
//         Doble clic sobre este texto
//       </p>
//     </div>
//   );
// }

// 3
// export default function E03_OnMouseEnter() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>3) onMouseEnter</h3>

//       <div
//         onMouseEnter={() => console.log(`[${ahora()}] ${nombre} - 3) onMouseEnter`)}
//         style={{ padding: 12, border: "1px solid #ccc", width: 260 }}
//       >
//         Pase el mouse
//       </div>
//     </div>
//   );
// }

// 4
// export default function E04_OnMouseLeave() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>4) onMouseLeave</h3>

//       <div
//         onMouseLeave={() => console.log(`[${ahora()}] ${nombre} - 4) onMouseLeave`)}
//         style={{ padding: 12, border: "1px solid #ccc", width: 260 }}
//       >
//         Salga de aquí
//       </div>
//     </div>
//   );
// }

// 5
// export default function E05_OnMouseMove() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>5) onMouseMove</h3>

//       <div
//         onMouseMove={() => console.log(`[${ahora()}] ${nombre} - 5) onMouseMove`)}
//         style={{ padding: 12, border: "1px solid #ccc", width: 260 }}
//       >
//         Mueva el cursor aquí
//       </div>
//     </div>
//   );
// }

// 6
// export default function E06_OnContextMenu() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>6) onContextMenu</h3>

//       <div
//         onContextMenu={(e) => {
//           e.preventDefault();
//           console.log(`[${ahora()}] ${nombre} - 6) onContextMenu`);
//           alert("clic derecho detectado");
//         }}
//         style={{ padding: 12, border: "1px solid #ccc", width: 260 }}
//       >
//         Clic derecho aquí
//       </div>
//     </div>
//   );
// }

// 7
// export default function E07_OnKeyDown() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>7) onKeyDown</h3>

//       <input
//         onKeyDown={(e) =>
//           console.log(`[${ahora()}] ${nombre} - 7) onKeyDown: ${e.key}`)
//         }
//         placeholder="Presiona una tecla"
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }

// 8
// export default function E08_OnKeyUp() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>8) onKeyUp</h3>

//       <input
//         onKeyUp={(e) =>
//           console.log(`[${ahora()}] ${nombre} - 8) onKeyUp: ${e.key}`)
//         }
//         placeholder="Suelta una tecla"
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }

// 9
// export default function E09_OnKeyPress() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>9) onKeyPress</h3>

//       <input
//         onKeyPress={(e) =>
//           console.log(`[${ahora()}] ${nombre} - 9) onKeyPress: ${e.key}`)
//         }
//         placeholder="Presiona una tecla imprimible"
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }

// 10
// import { useState } from "react";

// export default function E10_OnChange() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");
//   const [valor, setValor] = useState("");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>10) onChange</h3>

//       <input
//         value={valor}
//         onChange={(e) => {
//           setValor(e.target.value);
//           console.log(`[${ahora()}] ${nombre} - 10) onChange: ${e.target.value}`);
//         }}
//         placeholder="Escribe algo"
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }

// 11
// export default function E11_OnFocus() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>11) onFocus</h3>

//       <input
//         onFocus={() => console.log(`[${ahora()}] ${nombre} - 11) onFocus`)}
//         placeholder="Haz clic aquí"
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }
// 12
// export default function E12_OnBlur() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>12) onBlur</h3>

//       <input
//         onBlur={() => console.log(`[${ahora()}] ${nombre} - 12) onBlur`)}
//         placeholder="Enfoca y luego haz clic afuera"
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }
// // 13
// export default function E13_OnSubmit() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>13) onSubmit</h3>

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           console.log(`[${ahora()}] ${nombre} - 13) onSubmit`);
//           alert("Formulario enviado");
//         }}
//       >
//         <button type="submit" style={{ padding: "10px 14px" }}>
//           Enviar
//         </button>
//       </form>
//     </div>
//   );
// }
// // 14
// export default function E14_OnInput() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>14) onInput</h3>

//       <textarea
//         onInput={() => console.log(`[${ahora()}] ${nombre} - 14) onInput`)}
//         placeholder="Escribe aquí"
//         style={{ padding: 10, width: 260, height: 70 }}
//       />
//     </div>
//   );
// }
// // 15
// export default function E15_OnReset() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>15) onReset</h3>

//       <form
//         onReset={() => console.log(`[${ahora()}] ${nombre} - 15) onReset`)}
//       >
//         <input defaultValue="Texto para limpiar" style={{ padding: 10, width: 260 }} />
//         <div style={{ marginTop: 10 }}>
//           <button type="reset" style={{ padding: "10px 14px" }}>
//             Limpiar
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
// // 16
// export default function E16_OnSelect() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>16) onSelect</h3>

//       <input
//         defaultValue="Selecciona parte de este texto"
//         onSelect={() => console.log(`[${ahora()}] ${nombre} - 16) onSelect`)}
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }
// // 17
// export default function E17_OnCopy() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>17) onCopy</h3>

//       <p
//         onCopy={(e) => {
//           e.preventDefault();
//           console.log(`[${ahora()}] ${nombre} - 17) onCopy`);
//           alert("No se permite copiar");
//         }}
//         style={{ padding: 12, border: "1px solid #ccc", width: 260 }}
//       >
//         Intente copiar este texto
//       </p>
//     </div>
//   );
// }
// // 18
// export default function E18_OnPaste() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>18) onPaste</h3>

//       <input
//         onPaste={() => console.log(`[${ahora()}] ${nombre} - 18) onPaste`)}
//         placeholder="Pega aquí (Ctrl+V)"
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }
// // 19
// export default function E19_OnCut() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>19) onCut</h3>

//       <input
//         defaultValue="Corta aquí (Ctrl+X)"
//         onCut={() => console.log(`[${ahora()}] ${nombre} - 19) onCut`)}
//         style={{ padding: 10, width: 260 }}
//       />
//     </div>
//   );
// }
// // 20
// export default function E20_OnLoad() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>20) onLoad</h3>
//       <p>Pon una imagen en: <b>public/foto.jpg</b></p>

//       <img
//         src="/foto.jpg"
//         alt="foto"
//         onLoad={() => console.log(`[${ahora()}] ${nombre} - 20) onLoad`)}
//         style={{ width: 280, border: "1px solid #ccc" }}
//       />
//     </div>
//   );
// }
// // 21
// export default function E21_OnError() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>21) onError</h3>

//       <img
//         src="/inexistente.jpg"
//         alt="inexistente"
//         onError={() => {
//           console.log(`[${ahora()}] ${nombre} - 21) onError`);
//           alert("Error cargando imagen");
//         }}
//         style={{ width: 280, border: "1px solid #ccc" }}
//       />
//     </div>
//   );
// }
// // 22
// export default function E22_OnPlay() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>22) onPlay</h3>
//       <p>Pon un video en: <b>public/video.mp4</b></p>

//       <video
//         src="/video.mp4"
//         controls
//         onPlay={() => console.log(`[${ahora()}] ${nombre} - 22) onPlay`)}
//         style={{ width: 280, border: "1px solid #ccc" }}
//       />
//     </div>
//   );
// }

// // 23
// export default function E23_OnPause() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>23) onPause</h3>
//       <p>Pon un audio en: <b>public/audio.mp3</b></p>

//       <audio
//         src="/audio.mp3"
//         controls
//         onPause={() => console.log(`[${ahora()}] ${nombre} - 23) onPause`)}
//       />
//     </div>
//   );
// }
// // 24
// export default function E24_OnScroll() {
//   const nombre = "TU_NOMBRE_COMPLETO_AQUI";
//   const ahora = () => new Date().toLocaleString("es-CO");

//   return (
//     <div style={{ padding: 16, fontFamily: "Arial" }}>
//       <h3>24) onScroll</h3>

//       <div
//         onScroll={() => console.log(`[${ahora()}] ${nombre} - 24) onScroll`)}
//         style={{
//           height: 120,
//           width: 280,
//           overflowY: "auto",
//           border: "1px solid #ccc",
//           padding: 10,
//         }}
//       >
//         <div style={{ height: 400 }}>
//           Contenido largo...<br /><br />
//           Baja haciendo scroll dentro de este contenedor.<br /><br />
//           Más contenido...<br /><br />
//           Fin.
//         </div>
//       </div>
//     </div>
//   );
// }

// // 25
export default function E25_OnWheel() {
  const nombre = "TU_NOMBRE_COMPLETO_AQUI";
  const ahora = () => new Date().toLocaleString("es-CO");

  return (
    <div style={{ padding: 16, fontFamily: "Arial" }}>
      <h3>25) onWheel</h3>

      <div
        onWheel={() => console.log(`[${ahora()}] ${nombre} - 25) onWheel`)}
        style={{ padding: 12, border: "1px solid #ccc", width: 260 }}
      >
        Use la rueda aquí
      </div>
    </div>
  );
}