import RegisterForm from "../features/users/components/RegisterForm";

export default function App(){
  return(
    <div className="grid grid-cols-1 gap-6 justify-items-center">

      <h1 className="bg-brand text-brand-soft text-2xl font-bold">
          Vital-Plus
      </h1>

      <RegisterForm></RegisterForm>

    </div>
  )
}