import { createBrowserRouter } from "react-router-dom";

import MainLayout from "@/shared/layout/MainLayout";
import AuthLayout from "@/shared/layout/AuthLayout";

import HomePage from "@/features/home/page/homepage";
import ProfilePage from "@/features/users/pages/ProfilePage";

import {
  LoginPage,
  ForgotPasswordPage,
  ResetPasswordPage,
  AdminLoginPage,
} from "@/features/auth";

import CreateUserPage from "@/features/users/pages/CreateUserPage";
import EditUserForm from "@/features/users/components/EditUserForm";

import DashboardPage from "@/features/dashboard/pages/DashboardPage";

// MENU DE ADMINISTRACIÓN
import { MainMenu } from "@/features/Main";
import { CreateSalePage, SaleDetailPage } from "@/features/sales";
import { CreateProductPage } from "@/features/products";
import { CreateSupplierPage, SupplierDetailPage } from "@/features/suppliers";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/dashboard", element: <DashboardPage /> },

      { path: "cursos", element: <h1 className="p-4">Cursos</h1> },
      { path: "contacto", element: <h1 className="p-4">Contacto</h1> },
      { path: "videos", element: <h1 className="p-4">Videos</h1> },

      { path: "perfil", element: <ProfilePage /> },
      { path: "usuarios/editar", element: <EditUserForm /> },
    ],
  },

  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginPage /> },
      { path: "/admin/login", element: <AdminLoginPage /> },
      { path: "/forgot-password", element: <ForgotPasswordPage /> },
      { path: "/reset-password", element: <ResetPasswordPage /> },
    ],
  },


  { path: "/main", element: <MainMenu /> },
  { path: "/usuarios/crear", element: <CreateUserPage /> },
  { path: "/ventas/crear", element: <CreateSalePage /> },
  { path: "/ventas/modificar", element: <SaleDetailPage /> },
  { path: "/medicamentos/crear", element: <CreateProductPage /> },
  { path: "/proveedores/crear", element: <CreateSupplierPage /> },
  { path: "/proveedores/visualizar", element: <SupplierDetailPage />},

]);

export default router;