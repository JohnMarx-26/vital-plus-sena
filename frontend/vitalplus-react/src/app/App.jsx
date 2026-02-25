// import UserForm from "../features/users/components/UserForm"
// import DeleteCounter from "../shared/components/DeleteCounter"
// import DeleteUseEffect from "../shared/components/DeleteUseEffect"
import CreateRoleForm from "../features/users/components/CreateRolForm"
import LoginForm from "../features/users/components/LoginForm"

// codigo Original

export default function App(){
  return(
    <div className="grid grid-cols-1 gap-6 justify-items-center">
     <h1 className="bg-brand text-brand-soft text-2xl font-sans">
     Vital-Plus
     </h1>
      <CreateRoleForm/>
      {/* <UserForm/> */}
      {/* <LoginForm/> */}
      {/* <DeleteCounter/> */}
      {/* <DeleteUseEffect/> */}
      
    </div>
  )
}

// Prueba de codigo para centrar contenido

// export default function App() {
//   return (
//     <div className="min-h-screen flex flex-col bg-[var(--color-basic-white)]">
//       {/* Barra superior azul 600 */}
//       <div className="h-24 w-full bg-[var(--color-primary-600)]" />

//       {/* Centrado */}
//       <div className="flex-1 flex items-center justify-center bg-[var(--color-basic-white)]">
//         <div className="grid grid-cols-1 gap-6 justify-items-center">
//           <h1 className="bg-brand text-brand-soft text-2xl font-Helvetica">
//             Vital-Plus
//           </h1>

//           {/* <UserForm></UserForm> */}
//           <LoginForm></LoginForm>
//         </div>
//       </div>

//       {/* Barra inferior azul 600 */}
//       <div className="h-24 w-full bg-[var(--color-primary-600)]" />
//     </div>
//   );
// }



