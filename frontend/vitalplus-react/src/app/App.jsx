// import { RouterProvider } from "react-router-dom";
// import router from "@/app/router/index";
// import UserForm from "../features/users/pages/CreateUserPage";
// import EditUserForm from "../features/users/components/EditUserForm"
// import UserForm from "../features/users/pages/CreateUserPage"
// import ProductForm from "@/features/products/pages/CreateProductPage"
import EditProductForm from "../features/products/components/EditProductForm"

export default function App() {
  return (
    <div className="grid grid-cols-1 gap-6 justify-items-center">
      <h1 className="bg-brand text-brand-soft text-2xl font-bold">
        Vital-Plus
      </h1>
    {/* <ProductForm></ProductForm> */}
    {/* <EditUserForm/> */}
    {/* <UserForm/> */}
    <EditProductForm/>
  
    {/* <RouterProvider router={router} />  */}
    </div>
    )
  }
