import UserForm from "../features/users/components/UserForm"

export default function App(){
  return(
    <div className="grid grid-cols-1 gap-6 justify-items-center">
      <h1 className="bg-blue-500 text-black text-2xl font-bold">
          Vital-Plus
      </h1>

      <UserForm>

      </UserForm>

    </div>
  )
}