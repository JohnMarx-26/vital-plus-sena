import CreateRoleForm from "../features/users/components/CreateRolForm";
// import LoginForm from "../features/users/components/LoginForm";
// import EventosReact from "../features/users/components/EventosReact";

// import UserForm from "../features/users/components/UserForm";
// import DeleteCounter from "../shared/components/DeleteCounter";
// import DeleteUseEffect from "../shared/components/DeleteUseEffect";

export default function App() {
  return (
    <div className="grid grid-cols-1 gap-6 justify-items-center">
      <h1 className="bg-brand text-brand-soft text-2xl font-sans font-bold">
        Vital-Plus
      </h1>
      {/* <EventosReact/> */}
      <CreateRoleForm />
      
      {/* Otros componentes */}

      {/* <LoginForm /> */}
      {/* <UserForm /> */}
      {/* <DeleteCounter /> */}
      {/* <DeleteUseEffect /> */}
    </div>
  );
}





