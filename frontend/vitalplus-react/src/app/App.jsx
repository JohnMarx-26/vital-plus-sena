// import UserForm from "../features/users/components/UserForm"
import LoginForm from "../features/users/components/LoginForm"


export default function App(){
  return(
    <div className="grid grid-cols-1 gap-6 justify-items-center">
      <h1 className="bg-brand text-brand-soft text-2xl font-bold">
          Vital-Plus
      </h1>

      {/* <UserForm></UserForm> */}
      <LoginForm></LoginForm>

    </div>
  )
}



