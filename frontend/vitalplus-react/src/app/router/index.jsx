//importaciones BASE DE REACT
import { createBrowserRouter} from "react-router-dom";

import MainLayout from "@/shared/layout/MainLayout";
import AuthLayout from "@/shared/layout/AuthLayout";

import HomePage from "@/features/home/page/homepage";
import ProfilePage from "@/features/users/pages/ProfilePage";

import LoginPage from "@/features/auth/pages/LoginPage";
import ForgotPasswordPage from "@/features/auth/pages/ForgotPasswordPage";
import ResetPasswordPage from "@/features/auth/pages/ResetPasswordPage";

import CreateUserPage from "@/features/users/pages/CreateUserPage";
import EditUserForm from "@/features/users/components/EditUserForm";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

//MENU DE ADMINISTRACIÓN  
import { MainMenu } from "@/features/Main";
// import Menu from "@/features/Main/pages/MainMenu"
import CreateSalePage from "@/features/sales/pages/CreateSalePage";
import CreateProductPage from "@/features/products/pages/CreateProductPage";
import CreateSupplierPage from "@/features/suppliers/pages/CreateSupplierPage";


const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage/> },

      // ✅ NUEVA: home logeado
      { path: "/dashboard", element: <DashboardPage /> },

      { path: "cursos", element: <h1 className="p-4">Cursos</h1> },
      { path: "contacto", element: <h1 className="p-4">Contacto</h1> },
      { path: "videos", element: <h1 className="p-4">Videos</h1> },

      { path: "perfil", element: <ProfilePage /> },

      // ✅ Usuarios (para que existan y puedas probar)
      // { path: "usuarios/crear", element: <CreateUserPage /> },
      { path: "usuarios/editar", element: <EditUserForm />},    

      
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },

    {path: "/main", element: <MainMenu/>},
      // USUARIOS
      { path: "/usuarios/crear", element: <CreateUserPage/>},
      // {path: "usuarios/modificar", element: < />},
      // {path: "usuarios/visualizar" element: < />},
      // {path: "usuarios/listar" element: < />}

      // VENTAS
      { path: "/ventas/crear", element: <CreateSalePage/>},
      // {path: "ventas/modificar", element: < />},
      // {path: "ventas/listar" element: < />},
    
      // MEDICAMENTOS
      { path: "/medicamentos/crear", element: <CreateProductPage/>},
      // {path: "medicamentos/modificar", element: < />},
      // {path: "medicamentos/visualizar" element: < />},
      // {path: "medicamentos/listar" element: < />},

      // PROOVEDORES
      { path: "/proveedores/crear", element: <CreateSupplierPage/>},
      // {path: "proveedores/modificar", element: < />},
      // {path: "proveedores/visualizar" element: < />},
      // {path: "proveedores/listar" element: < />},
]);

export default router;